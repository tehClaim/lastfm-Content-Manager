/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('LfmTool.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'Ext.window.MessageBox'
    ],

    alias: 'controller.main',
    control:{
        'viewport':{
            afterrender: function(viewport){
                viewport.down('app-header').getViewModel().setData({userName: SharedData.userName});
                viewport.down('wishlist').getViewModel().getStore('wishlist').load({
                    params:{
                        userId: SharedData.id
                    }
                });
            }
        }
    },
    onClickButton: function () {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },

    onConfirm: function (choice) {
        if (choice === 'yes') {
            //
        }
    }
});
