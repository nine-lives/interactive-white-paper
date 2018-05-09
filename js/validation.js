$(function () {
    $(".wizard").on("wizard:next", function(event) {
        var $page = $(event.page);
        $page.find('input').each(function() {
            if(this.checkValidity() === false) {
                event.preventDefault();
            }
        });
        $page.addClass('was-validated');
    });
});