//function to load upcoming events
function loadUpcomingEvents() {
    $.ajax({
        type: 'GET',
        url: 'https://sef-dataholder.herokuapp.com/calendar/onelive?maxResults=3',
        dataType: 'json',
        success: function (payload) {
            if (!(payload.items === undefined || payload.items.length == 0)) {
                payload.items.forEach((item) => {
                    /*todo
                    * to get img link
                    * let fileId = item.attachments[0].fileId;
                    * item.imgLink = "https://drive.google.com/uc?export=view&id=" + fileId;
                    * */

                    //get fb link and remove it from description
                    // (split the part of the description where the fb link is added)
                    let description = item.description;
                    item.facebookLink = description.substring(description.lastIndexOf('<a href') + 9,
                        description.lastIndexOf('" id='));
                    item.description = description.substring(0, description.lastIndexOf('<a href'));
                    //get date & time of the event
                    let start = new Date(item.start.dateTime);
                    let end = new Date(item.end.dateTime);
                    item.day = start.toLocaleDateString([], {weekday: 'short'});
                    item.month = start.toLocaleDateString([], {month: 'short'});
                    item.date = start.toLocaleDateString([], {day: '2-digit'});
                    item.startTime = start.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    });
                    item.endTime = end.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    });
                });
                //Mustache render
                let content = Mustache.render($("#upcoming-events-template").html(), {"data": payload.items});
                $("#upcoming-events").html(content);
            } else {
                $("#upcoming-events .status-text").text("Currently there are no upcoming events");
            }
        }
    });
}
