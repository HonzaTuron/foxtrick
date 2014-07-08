'use strict';
/**
 * add-promote-reminder.js
 * Add a reminder in the day that you can promote a Youth Player
 * @author tasosventouris
 */

Foxtrick.modules['AddPromoteReminder'] = {
	MODULE_CATEGORY: Foxtrick.moduleCategories.SHORTCUTS_AND_TWEAKS,
	PAGES: ['youthPlayerDetails','reminders'],

	CSS: Foxtrick.InternalPath + 'resources/css/copy-player-ad.css',

	run: function(doc) {
		var sendDate = Foxtrick.getParameterFromUrl(doc.location.href, 'sendDate')
		var isReminders = Foxtrick.isPage(doc,"reminders");
		var isYouthPlayerDetails = Foxtrick.isPage(doc,"youthPlayerDetails");
		
		if (sendDate && isReminders) {	
			doc.getElementById("ctl00_ctl00_CPContent_CPMain_ddlSendAs").value = "2";	

		} else if (isYouthPlayerDetails) {
			var daysToPromote = Foxtrick.Pages.YouthPlayer.getDaysToPromote(doc);
			var playerID = Foxtrick.Pages.Player.getId(doc);
			if (daysToPromote > 0) {
				var button = Foxtrick.util.copyButton.add(doc,
					Foxtrick.L10n.getString('copy.playerad'));

				var today = new Date();
				today.setDate(today.getDate() + parseInt(daysToPromote)); 
				var d = today.getDate();
				var m = today.getMonth() + 1;
				var y = today.getFullYear();
				var promoteday = y + '-'+ m + '-'+ d + '+00%3a00%3a00';

				var promotetext = 'Your player '+ '[youthplayerid=' + playerID + '] is ready to promote';
				var reminderlink = '/MyHattrick/Reminders/default.aspx?sendDate='+promoteday+'&reminderText='+promotetext
		
				if (button) {
					Foxtrick.addClass(button, 'ft-add-promote-reminder');
					Foxtrick.onClick(button, function() {
						doc.location.assign(reminderlink);})
				}
			}
		}
	}
};
