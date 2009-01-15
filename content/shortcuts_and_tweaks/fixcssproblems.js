/**
 * Fixes for css isues
 * @author spambot
 */
 
FoxtrickFixcssProblems = {
	
    MODULE_NAME : "FixcssProblems",
    MODULE_CATEGORY : Foxtrick.moduleCategories.SHORTCUTS_AND_TWEAKS,
    DEFAULT_ENABLED : true,
    
    OPTIONS : {},
    
    init : function() {
        Foxtrick.registerPageHandler( 'all' , this );
        this.initOptions(); 
    },

    run : function(page, doc) {
        
        // standard | simpe | all
        var LAYOUTSWITCH = new Array (
            "standard"
        );
        // dump (' => LAYOUT: ' + Foxtrick.isStandardLayout( doc ) + '\n');
        for (var i = 0; i < this.OPTIONS.length; i++) {
            
            if (Foxtrick.isModuleFeatureEnabled( this, this.OPTIONS[i]  ) ) {
                var css = "chrome://foxtrick/content/resources/css/fixes/" + this.OPTIONS[i] + ".css";
                if ( ( (LAYOUTSWITCH[i] == 'standard' ) || (LAYOUTSWITCH[i] == 'all') ) && (Foxtrick.isStandardLayout( doc ) == true) ) {
                    dump ('  FIXES: (standard) ' + i + ' - ' + this.OPTIONS[i] + ' enabled.\n');
                    Foxtrick.addStyleSheet( doc, css );
                } 
                else if ( ((LAYOUTSWITCH[i] == 'simple' ) || (LAYOUTSWITCH[i] == 'all')) && (Foxtrick.isStandardLayout( doc ) == false) ) {
                    dump ('  FIXES: (simple) ' + i + ' - ' + this.OPTIONS[i] + ' enabled.\n');
                    Foxtrick.addStyleSheet ( doc, css );
                } 
                else {
                    dump ('  FIXES: ' + i + ' - ' + this.OPTIONS[i] + ' disabled.\n');
                }
            }
        }    
    },
	
	change : function( page, doc ) {

	},
        
    initOptions : function() {
        // Name of css file
		this.OPTIONS = new Array( 
                                    "Forum_Hover_Links"
								);
	}        
};