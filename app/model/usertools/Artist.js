Ext.define('LfmTool.model.usertools.Artist',{
    extend: 'Ext.data.Model',
    fields: [
        {name: 'mbid', type: 'string'},
        {name: 'name', type: 'string'},
        {name: 'listeners', type: 'number'},
        {name: 'playcount', type: 'int'},
        {name: 'image', type: 'string', defaultValue: 'resources/images/nophoto.png'},
        {name: 'imageSmall', type: 'string'},
        {name: 'imageVerySmall', type: 'string'},
        {name: 'listeners', type: 'int'},
        {name: 'totalPlaycount', type: 'int'},
        {name: 'ontour', type: 'bool'},

        //TODO reailize how to bind values from array in store
        {name: 'tag0', type: 'string'},
        {name: 'tag1', type: 'string'},
        {name: 'tag2', type: 'string'},
        {name: 'tag3', type: 'string'},
        {name: 'tag4', type: 'string'},

        {name: 'added', type: 'date', dateFormat: 'Y-m-d' },

        {name: 'matchingIndex', type: 'string', mapping: 'match'}
    ]
});