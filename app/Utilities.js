Ext.define('LfmTool.Utilities', {
    statics: {
        secondsToTime: function(secs) {
            secs = Math.round(secs);
            var hours = Math.floor(secs / (60 * 60));

            var divisor_for_minutes = secs % (60 * 60);
            var minutes = Math.floor(divisor_for_minutes / 60);

            var divisor_for_seconds = divisor_for_minutes % 60;
            var seconds = Math.ceil(divisor_for_seconds);

            var obj = {
                "h": hours,
                "m": minutes,
                "s": seconds
            };
            return obj;
        },

        multiCallback: function(stores){
            for(var key in stores){
                if(stores[key].isLoading()) return false;
            }
            return true;
        },

        popup: (function(){
            var msgCt;

            function createBox(t, s){
                return '<div class="msg"><h3>' + t + '</h3><p>' + s + '</p></div>';
            }
            return {
                msg : function(title, format){
                    if(!msgCt){
                        msgCt = Ext.DomHelper.insertFirst(document.body, {id:'msg-div'}, true);
                    }
                    var s = Ext.String.format.apply(String, Array.prototype.slice.call(arguments, 1));
                    var m = Ext.DomHelper.append(msgCt, createBox(title, s), true);
                    m.hide();
                    m.slideIn('t').ghost("t", { delay: 2000, remove: true});
                },

                init : function(){
                    if(!msgCt){
                        // It's better to create the msg-div here in order to avoid re-layouts
                        // later that could interfere with the HtmlEditor and reset its iFrame.
                        msgCt = Ext.DomHelper.insertFirst(document.body, {id:'msg-div'}, true);
                    }
                }
            };
        })()
    }
});
