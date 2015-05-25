Ext.define('LfmTool.model.User',{
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'username', type: 'string'},
        {name: 'imageSmall', type: 'string'}
    ]
});