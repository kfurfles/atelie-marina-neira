'use strict';
module.exports = () => ({
  'users-permissions': { enabled: true },
  upload: { config: { sizeLimit: 25 * 1024 * 1024 } },
});
