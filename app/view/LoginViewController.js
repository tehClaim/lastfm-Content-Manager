Ext.define('LfmTool.view.LoginViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',
    requires:[
        'LfmTool.view.main.Main'
    ],
    control:{
        '#username':{
            specialkey: function(field, e){
                if (e.getKey() == e.ENTER){
                    this.onLoginClick();
                }
            }
        }
    },

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
                    if(output.success == false){
                        if(output.error == '6') LfmTool.Utilities.popup.msg('Error!', 'User not found!');
                        else LfmTool.Utilities.popup.msg('Error!', 'Something went wrong!');
                    } else {
                        SharedData.id = output.id;
                        SharedData.userName = output.name;
                        SharedData.imageSmall = output.imageSmall;
                        this.getView().destroy();
                        Ext.widget('app-main');
                        LfmTool.Utilities.popup.msg('Success!', 'Logged as '+SharedData.userName);
                    }
                },
                failure: function(){
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
        //login via my account for guests(for testing purpose)
        SharedData.id = '40239553';
        SharedData.userName = 'tehclaim';
        this.getView().destroy();
        var app = Ext.widget('app-main');
        //app.down('app-header').getViewModel().setData({userName: SharedData.userName});
        LfmTool.Utilities.popup.msg('Success!', 'Logged as guest user!');
    }

});