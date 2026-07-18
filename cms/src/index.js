'use strict';

const PUBLIC_READ_APIS = ['produto', 'categoria', 'sobre', 'config-site'];

async function grantPublicReadPermissions(strapi) {
  const publicRole = await strapi.db
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });
  if (!publicRole) return;
  for (const api of PUBLIC_READ_APIS) {
    for (const op of ['find', 'findOne']) {
      const action = `api::${api}.${api}.${op}`;
      const existing = await strapi.db
        .query('plugin::users-permissions.permission')
        .findOne({ where: { action, role: publicRole.id } });
      if (!existing) {
        await strapi.db.query('plugin::users-permissions.permission').create({
          data: { action, role: publicRole.id },
        });
        strapi.log.info(`[bootstrap] Public permission: ${action}`);
      }
    }
  }
}

module.exports = {
  register() {},
  async bootstrap({ strapi }) {
    try { await grantPublicReadPermissions(strapi); }
    catch (e) { strapi.log.error('[bootstrap] failed', e); }
  },
};
