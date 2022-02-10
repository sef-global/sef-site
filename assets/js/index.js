$(function () {
    setEqualHeightsForTimelineItems();

    function setEqualHeightsForTimelineItems() {
    
        const timelineItems = document.querySelectorAll(".timeline li > div");

        let maxHeight = 0;
        timelineItems.forEach(item => {
            const height = item.offsetHeight;

            if (maxHeight < height) {
                maxHeight = height;
            }
        })

        timelineItems.forEach(item => {
            item.style.height = `${maxHeight}px`;
        })
    }
});
