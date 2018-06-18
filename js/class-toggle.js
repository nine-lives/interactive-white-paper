$(function () {
    $("[data-toggle-class]").click(function (event) {
        event.preventDefault();
        var $this = $(this);
        var $target = $this.data('toggle-target') ? $($this.data('toggle-target')) : $this;
        $target.toggleClass($this.data('toggle-class'));
    });
});