$(document).ready(function() {
    const $typeahead = $('#typeahead');
    const $dropdown = $('#dropdown');
  
    let selectedIndex = -1;
  
    $typeahead.on('input', function() {
      const query = $(this).val();
      if (query.length >= 2) {
        $.getJSON('/states', { q: query }, function(data) {
            $dropdown.empty();
            console.log(data); // Check the data structure
            data.forEach(state => {
              $dropdown.append(`<li>${state}</li>`);
            });
            selectedIndex = -1;
          }).fail(function(jqXHR, textStatus, errorThrown) {
            console.error('AJAX error:', textStatus, errorThrown); // Error handling
          });
      } else {
        $dropdown.empty();
      }
    });
  
    $typeahead.on('keydown', function(e) {
      if (e.keyCode === 40) { // Down arrow
        selectedIndex = (selectedIndex + 1) % $dropdown.children().length;
        updateSelectedItem();
      } else if (e.keyCode === 38) { // Up arrow
        selectedIndex = (selectedIndex - 1 + $dropdown.children().length) % $dropdown.children().length;
        updateSelectedItem();
      } else if (e.keyCode === 13) { // Enter
        if (selectedIndex !== -1) {
          const selectedState = $dropdown.children().eq(selectedIndex).text();
          $typeahead.val(selectedState);
          $dropdown.empty();
        }
      }
    });
  
    $dropdown.on('click', 'li', function() {
      $typeahead.val($(this).text());
      $dropdown.empty();
    });
  
    function updateSelectedItem() {
      $dropdown.children().removeClass('selected');
      if (selectedIndex !== -1) {
        $dropdown.children().eq(selectedIndex).addClass('selected');
      }
    }
  });