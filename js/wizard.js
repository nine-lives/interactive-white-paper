$(function () {
    $(".wizard").each(function() {
        var $this = $(this);
        $this.find('.wizard-page').each(function() {
            var $page = $(this);
            $page.find('.wizard-next').click(function() {
                var event = jQuery.Event("wizard:next");
                event.target = $this.get();
                event.page = $page.get();
                $this.trigger(event);
                if ( !event.isDefaultPrevented() ) {
                    $page.toggleClass('active', false);
                    $page.next('.wizard-page').toggleClass('active', true);
                }
            });
        });
    });
});