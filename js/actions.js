$('#videomodal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var recipient = button.data('link').video // Extract info from data-* attributes
    var title = button.data('link').title
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    console.log(recipient)
    console.log(title)
    modal.find('.modal-title').text(title)
    modal.find('#mi_iframe').attr('src', recipient)
    //modal.find('.modal-body input').val(recipient)
  })