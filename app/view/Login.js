Ext.define('LfmTool.view.Login', {
    extend: 'Ext.window.Window',
    controller: 'login',
    requires: [
        'LfmTool.view.LoginViewController'
    ],
    xtype: 'login',
    title: 'Login',
    layout: 'fit',
    height: 230,
    width: 320,
    constrain: true,
    resizable: false,
    closable: false,
    initComponent: function() {
        var form = {
            xtype: 'form',
            reference: 'loginForm',
            itemId: 'loginForm',
            defaultType: 'textfield',
            layout:{
                type: 'vbox',
                padding: 10
            },
            defaults:{
                width: '100%',
                labelWidth: 80,
                margin: '0 0 5 0'
            },
            items: [{
                xtype: 'container',
                html: 'Provide your last.fm account information <br> Pseudo authentification enabled for testing purpose<br>If you don&#8216;t have account, click &#8216;Guest session&#8216;.'
            },{
                allowBlank: false,
                fieldLabel: 'Username',
                reference: 'username',
                itemId: 'username',
                maxLength: 15,
                emptyText: 'username'
            },{
                allowBlank: false,
                fieldLabel: 'Password',
                reference: 'password',
                disabled: true,
                emptyText: 'temporary disabled',
                inputType: 'password'
            }],

            buttons: [{
                text:'Guest session',
                itemId: 'guestLoginBtn',
                handler: 'onGuestLogin'
            },{
                text:'Login',
                itemId: 'loginBtn',
                handler: 'onLoginClick'
            }]
        };

        this.items = [form];
        this.callParent();
    },

    showProgressBar: function(mode){
        var form = this.down('#loginForm'),
            formItems = [this.down('#guestLoginBtn'), this.down('#loginBtn'), this.down('#username')];
        if(mode) {
            for(var key in formItems){
                formItems[key].disable();
            }
            form.add({
                xtype: 'progressbar',
                itemId: 'pbarPanel',
                flex: 1
            });
            var pbar = form.down('#pbarPanel');
            pbar.wait({
                interval: 150, //bar will move fast!
                increment: 15,
                text: "Logging in..."
            });
        } else{
            for(var key in formItems){
                formItems[key].enable();
            }
            var pbar = form.down('#pbarPanel');
            form.remove(pbar);

        }
    }
});