
// Task Viewer Sort Settings
include.exports = Class({
    Store: Class.LocalStore('/settings/viewer'),
    
    time: 'select',
    sort: {
        time: 'asc'
    }
});