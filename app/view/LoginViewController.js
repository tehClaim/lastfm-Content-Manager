Ext.define('LfmTool.view.LoginViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',

    onLoginClick: function(){
        var userName = this.lookupReference('username'),
            loginForm = this.lookupReference('loginForm');
        if(loginForm.isValid()){
            this.getView().showProgressBar(true);
            Ext.Ajax.request({
                url: 'php/authUser.php',
                params:{
                    userName: userName.getValue()
                },
                success: function(response){
                    this.getView().showProgressBar(false);
                    var output = Ext.JSON.decode(response.responseText);
                    if(output.success == 'false'){
                        if(output.error == '6'){
                            LfmTool.Utilities.popup.msg('Error!', 'User not found!');
                        } else{
                            LfmTool.Utilities.popup.msg('Error!', 'Something went wrong!');
                        }
                    } else{
                        SharedData.id = output.id;
                        SharedData.userName = output.name;
                        SharedData.imageSmall = output.imageSmall;
                        var viewport = Ext.ComponentQuery.query('viewport')[0];
                        viewport.unmask();
                        this.getView().close();
                        viewport.down('wishlist grid').getStore().load({
                            params:{
                                userId: SharedData.id
                            },
                            callback: function(records, operation, success){
                                if(!success)LfmTool.Utilities.popup.msg('Error!', 'Something went wrong!');
                            }
                        });
                        viewport.down('#loggedUser').setText(SharedData.userName);
                        LfmTool.Utilities.popup.msg('Success!', 'Logged as '+SharedData.userName);
                    }


                },
                failure: function(response){
                    LfmTool.Utilities.popup.msg('Error!', 'Something went wrong!');
                    this.getView().showProgressBar(false);
                },
                scope: this
            });
        } else{
            LfmTool.Utilities.popup.msg('Error!', 'Validation failed!');
        }
    },

    onGuestLogin: function(){
        //this.getView().showProgressBar(true);
        SharedData.id = '40239553';
        SharedData.userName = 'tehclaim';
        var viewport = Ext.ComponentQuery.query('viewport')[0];
        viewport.unmask();
        this.getView().close();
        viewport.down('wishlist grid').getStore().load({
            params:{
                userId: SharedData.id
            },
            callback: function(records, operation, success){
                if(success) LfmTool.Utilities.popup.msg('Success!', 'Logged as guest user!');
                else LfmTool.Utilities.popup.msg('Error!', 'Something went wrong!');
                viewport.down('#loggedUser').setText(SharedData.userName);
            }
        });
    },

    init: function() {
        this.control({
            'login':{
                afterrender: function(window){
                    var viewport = Ext.ComponentQuery.query('viewport')[0];
                    window.center();
                    viewport.mask();
                }
            },

            '#username':{
                specialkey: function(field, e){
                    if (e.getKey() == e.ENTER){
                        this.onLoginClick();
                    }
                }
            }
        })
    }

});