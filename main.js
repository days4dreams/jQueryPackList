/*function to run so that the text will be updated when the user submits task, marks an item as packed or removes an item. Call updateCount within the functions that are associated with events. */

function updateCount() {

    var itemsToPack = $('#packingList li').not('.packed').length;
//find out how many items in the list have not yet been packed
    var itemText = itemsToPack === 1 ? itemsToPack + " item" : itemsToPack + " items";

    $('#itemSummary span').html(itemText);
// Update text of span in #itemSummary; displays number of items left to be packed
  
    totalListItems = $('#packingList li').length;

    if (totalListItems > 0) {
        $('#itemSummary button').fadeIn();
        $('#itemSummary p').fadeIn();
    } else {
        $('#itemSummary button').fadeOut();
    }
// Find how many total items are in list. If there are items, fade in the buttons inside of #itemSummary. If not, fade the buttons out.
}


/* EVENTS */
/* building out a packing list site that allows users to add new items to pack, edit existing items, and mark items that have already been packed. */

$('#packingForm').on('submit', function (e){
  e.preventDefault();
//Event listener on the form, which has the id packingForm.
//When form is submitted - on.submit - prevent default action and run below
  
  var itemText = $('#newItemDescription').val();
//new variable contains the input of the input field with id newItemDescription. 
  
    $('#newItemDescription').val('');
//now we have input from user stored in variable, clear our input field by assigning value of nothing.
  
    var newListItem = '<li><input type="checkbox"><span class="item">' + itemText + '</span><a href="#" class="edit">Edit</a><a href="#" class="remove">Remove</a></li>';
//create a new variable that hold string we want to add to page
  
   $('#packingList').append(newListItem);
//push variable to end of UL with the id packingList, using append
  updateCount();
});

/* when the user checks a checkbox, the list item that the checkbox is in will get the packed class, and when the user unchecks a checkbox, the packed class will be removed from the list item that the checkbox is in. */

$('#packingList').on('change','input[type="checkbox"]', function(e){
  $(this).parent().toggleClass('packed');
  updateCount();
});
//Use the change event to listen for when the user changes the value of checkbox; item does not exist when the page loads, hence event delegation. Element to listen for an event on is input[type="submit"], and is a descendant of the #packingList, which exists when the page loads. Select only inputs that have a type of checkbox, using input[type="checkbox"]. Find specific input the user changed, and then use parent() to add or remove class from the parent element.

/* remove list item from the packing list when the user clicks on the remove link. */
$('#packingList').on('click', '.remove', function(e){
  e.preventDefault();
  $(this).parent().remove();
  
    updateCount();
});
// Listen for event on an element that does not exist when the page loads - Element with class of remove, a descendant of the #packingList, which exists when page loads. Use preventDefault() method to prevent the default action for anchors, which is to reload the page. Use remove() method to remove parent of the anchor with the class .remove. We'll want to be sure to remove the parent, and not the anchor itself.


/* allow users to edit list itme */
$('#packingList').on('click', '.edit', function(e){
  e.preventDefault();
  var updateText = $(this).parent('.item').text();
  
  $(this).parent().html('<form id="editor"><input type="text" value="' + updateText +'"><button type="submit" class="btn">Save</button></form>');
});

/* when user submits the #editor form, the list item will be updated with description user entered: */

$('#packingList').on('submit', '#editor', function (e) {

    e.preventDefault();

    var itemText = $(this).find('input').val();

    var newListItem = '<input type="checkbox"><span class="item">' + itemText + '</span><a href="#" class="edit">Edit</a><a href="#" class="remove">Remove</a>';

    $(this).parent().html(newListItem);
 
});
//Listening for event when the user submits the form, so event type is submit. Listening for event on an element that does not yet exist on the page, so use event delegation.
//use the val() method to find out what the user entered and use $(this) to find out which specific form the user submitted. Get the value from the input field and update the HTML of parent list item.

/* removes all items in packing list when user clicks on #deleteItems button.*/
$('#deleteItems').on('click', function () {
    $('#packingList').empty();
    updateCount();
});

/*when user clicks #clearPacked button, any items packed should be removed from list and count updated.*/
$('#clearPacked').on('click', function () {
    $('.packed').remove();
    updateCount();
});
