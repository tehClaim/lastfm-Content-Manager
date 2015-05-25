Ext.define('LfmTool.model.usertools.Track',{
    extend: 'Ext.data.Model',
    fields: [
        {name: 'name', type: 'string'},
        {name: 'playcount', type: 'int'},
        {name: 'duration', type: 'int'}
    ]
});