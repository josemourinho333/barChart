// Navigation buttons handler
const navigationButtons = (event) => {
  let buttonClass = event.target.className;
  if (buttonClass.includes('create-button')) {
    $('.create-button').hide();
    $('.add-button').hide();
    $('.edit-button').hide();
    $('.confirmation-buttons').show();
    $('.create-area-container').css('display','grid');
    $('.submit-button').removeAttr('id');
    $('.submit-button').attr('id', 'submit-create');
  } else if (buttonClass.includes('add-button')) {
    $('.create-button').hide();
    $('.add-button').hide();
    $('.edit-button').hide();
    $('.confirmation-buttons').show();
    $('.add-area-container').css('display','grid');
    $('.submit-button').removeAttr('id');
    $('.submit-button').attr('id', 'submit-add');
  } else if (buttonClass.includes('edit-button')) {
    $('.create-button').hide();
    $('.add-button').hide();
    $('.edit-button').hide();
    $('.cancel-button').show();
    $('.edit-bar-chart-button').show();
    $('.edit-bar-settings-button').show();
    $('.edit-title-button').show();
  } else if (buttonClass.includes('edit-bar-chart-button')) {
    $('.edit-bar-settings-button').hide();
    $('.edit-title-button').hide();
    $('.confirmation-buttons').show();
    $('.edit-area-container').css('display','grid');
    editChart();
    $('.submit-button').removeAttr('id');
    $('.submit-button').attr('id', 'submit-edit-chart');
  } else if (buttonClass.includes('edit-bar-settings-button')) {
    $('.edit-bar-chart-button').hide();
    $('.edit-title-button').hide();
    $('.confirmation-buttons').show();
    $('.edit-settings-container').css('display','grid');
    editSettings();
    $('.submit-button').removeAttr('id');
    $('.submit-button').attr('id', 'submit-edit-settings');
  } else if (buttonClass.includes('edit-title-button')) {
    $('.edit-bar-chart-button').hide();
    $('.edit-bar-settings-button').hide();
    $('.confirmation-buttons').show();
    $('.edit-title-container').css('display','grid');
    editTitle();
    $('.submit-button').removeAttr('id');
    $('.submit-button').attr('id', 'submit-edit-title');
  }
};

// Confirmation buttons handler
const confirmationButtons = (event) => {
  let buttonId = event.target.id;
  if (buttonId.includes('cancel-button')) {
    $('.create-button').show();
    $('.add-button').show();
    $('.edit-button').show();
    $('.edit-bar-chart-button').hide();
    $('.edit-bar-settings-button').hide();
    $('.edit-title-button').hide();
    $('.confirmation-buttons').hide();
    $('.input-areas').hide();
    $('.submit-button').removeAttr('id');
  } else if (buttonId.includes('submit-create')) {
    drawBarChart();
    $('.create-button').show();
    $('.add-button').show();
    $('.edit-button').show();
    $('.edit-bar-chart-button').hide();
    $('.edit-bar-settings-button').hide();
    $('.edit-title-button').hide();
    $('.confirmation-buttons').hide();
    $('.input-areas').hide();
    $('.submit-button').removeAttr('id');
  } else if (buttonId.includes('submit-add')) {
    addNewBar();
    $('.create-button').show();
    $('.add-button').show();
    $('.edit-button').show();
    $('.edit-bar-chart-button').hide();
    $('.edit-bar-settings-button').hide();
    $('.edit-title-button').hide();
    $('.confirmation-buttons').hide();
    $('.input-areas').hide();
    $('.submit-button').removeAttr('id');
  } else if (buttonId.includes('submit-edit-chart')) {
    updateBar();
    $('.create-button').show();
    $('.add-button').show();
    $('.edit-button').show();
    $('.edit-bar-chart-button').hide();
    $('.edit-bar-settings-button').hide();
    $('.edit-title-button').hide();
    $('.confirmation-buttons').hide();
    $('#edit-space').empty();
    $('.input-areas').hide();
    $('.submit-button').removeAttr('id');
  } else if (buttonId.includes('submit-edit-settings')) {
    updateBarSettings();
    $('.create-button').show();
    $('.add-button').show();
    $('.edit-button').show();
    $('.edit-bar-chart-button').hide();
    $('.edit-bar-settings-button').hide();
    $('.edit-title-button').hide();
    $('.confirmation-buttons').hide();
    $('#edit-space-settings').empty();
    $('.input-areas').hide();
    $('.submit-button').removeAttr('id');
  } else if (buttonId.includes('submit-edit-title')) {
    updateBarTitle();
    $('.create-button').show();
    $('.add-button').show();
    $('.edit-button').show();
    $('.edit-bar-chart-button').hide();
    $('.edit-bar-settings-button').hide();
    $('.edit-title-button').hide();
    $('.confirmation-buttons').hide();
    $('#edit-title').empty();
    $('.input-areas').hide();
    $('.submit-button').removeAttr('id');
  }
};

// Function that will take inputs and generate a new chart and render it on the page
const drawBarChart = (data, options, element) => {
  // Declaring variables and grabbing the inputs for the data that will be displayed in the chart then storing them as an array.
  let barNames = $('#create-bar-labels').text();
  let barNamesArray = barNames.split(',');
  let barValues = $('#create-bar-values').text();
  let barValuesArray = barValues.split(',');
  data = barNamesArray.concat(barValuesArray);

  // Declaring variables and grabbing the inputs for the chart settings storing them as an array.
  let barHeader = $('#create-bar-category-name').text();
  let barHeaderArray = [barHeader];
  let barLegends = $('#create-bar-legends').val();
  let barLegendsArray = barLegends.split(',');
  options = barHeaderArray.concat(barLegendsArray);

  // Declaring a variable where the chart will be rendered inside
  element = $('#container');

  // Called to make the bars and the bars names and append them into appropriate html structure with right classes with random colors.
  const barsOut = (data, options, element) => {
      let maxTick = options[1];
      for (let i = 0; i < data.length/2; i++) {
        let colorR = Math.floor((Math.random() * 256));
        let colorG = Math.floor((Math.random() * 256));
        let colorB = Math.floor((Math.random() * 256));
        let rgb = `${colorR}, ${colorG}, ${colorB}`;
        let realWidth = Math.floor((data[i+(data.length/2)]/maxTick)*100);

        let $gridContainer = $('<div/>', {class: 'grid-container'}),
            $gridName = $('<div/>', {class: 'name', text: data[i], style: 'background-color: rgb(' + rgb + ');'}),
            $gridValue = $('<div/>', {
              class: 'value',
              text: data[i+(data.length/2)],
              style: 'width: ' + realWidth + '%;' + 'background-color: rgb(' + rgb + ');'});

        $gridContainer.append($gridName).appendTo(element);
        $gridContainer.append($gridValue).appendTo(element);
      }
    };

  // Called to make the bar header label and the ticks for the graph
  const setTicks = (options, element) => {
      let nameHeader = options[0];
      let maxTick = parseInt(options[1]);
      let minTick = parseInt(options[2]);
      let tickBy = parseInt(options[2]);
      let ticks = maxTick/tickBy;

      let $gridHeaderContainer = $('<div/>', {
            class: 'grid-header-container',
            style: 'grid-template-columns: 300px repeat(' + ticks + ', 1fr)'
          }),
          $nameHeader = $('<div/>', {class: 'name-header', text: nameHeader});

      $gridHeaderContainer.append($nameHeader).appendTo(element);

      for (let j = 0; j < ticks; j++) {
        let $valueHeader = $('<div/>', {class: 'value-header', text: (minTick += tickBy) - tickBy});
        $gridHeaderContainer.append($valueHeader).appendTo(element);
      }
    };

  setTicks(options, element);
  barsOut(data, options, element);
};

// Function that will take inputs and add a new bar in an existing chart
const addNewBar = (name, value, color) => {
  name = $('.new-bar-label').val();
  value = parseInt($('.new-bar-value').val());
  color = $('.new-color-value').val();
  let maxTick = $('.value-header').last();
  let realWidth = Math.floor((value/maxTick.text())*100);

  let $gridContainer = $('<div/>', {class: 'grid-container'}),
      $gridName = $('<div/>', {class: 'name', text: name, style: 'background-color:' + color}),
      $gridValue = $('<div/>', {
        class: 'value',
        text: value,
        style: 'width:' + realWidth + '%' + ';' + 'background-color:' + color});

  $gridContainer.append($gridName).appendTo('#container');
  $gridContainer.append($gridValue).appendTo('#container');
};

// Function that will grab bar chart data and puts them in the text area
const editChart = () => {
  const nameArray = [];
  const valueArray = [];
  const names = $('.name');
  const values = $('.value');
  for (let i = 0; i < names.length; i++) {
    nameArray.push(names[i].innerText);
  };

  for (let j = 0; j < values.length; j++) {
    valueArray.push(values[j].innerText);
  };

  $('#edit-space').text(nameArray + ',' + valueArray);
};

// Function that will update the chart after making changes in the textarea after editChart has been completed
const updateBar = () => {
  $('.grid-container').remove();

  let changes = $('#edit-space').val();
  let changesArray = changes.split(',');
  let maxTick = $('.value-header').last();
  for (let i = 0; i < changesArray.length/2 ; i++) {
    let colorR = Math.floor((Math.random() * 256));
    let colorG = Math.floor((Math.random() * 256));
    let colorB = Math.floor((Math.random() * 256));
    let rgb = `${colorR}, ${colorG}, ${colorB}`;
    let realWidth = Math.floor((changesArray[i+(changesArray.length/2)]/maxTick.text())*100);

    let $gridContainer = $('<div/>', {class: 'grid-container'}),
        $gridName = $('<div/>', {class: 'name', text: changesArray[i], style: 'background-color: rgb(' + rgb + ');'}),
        $gridValue = $('<div/>', {
          class: 'value',
          text: changesArray[i+(changesArray.length/2)],
          style: 'width: ' + realWidth + '%;' + 'background-color: rgb(' + rgb + ');'});

    $gridContainer.append($gridName).appendTo($('#container'));
    $gridContainer.append($gridValue).appendTo($('#container'));
  }
};

// Function that will grab the bar chart settings and puts them in the text area
const editSettings = (options) => {
  let header = $('.name-header').text();
  let maxTick = $('.value-header').last();
  let tickBy = $('.value-header').first();

  $('#edit-space-settings').text(`${header}, ${maxTick.text()}, ${tickBy.text()}`);
};

// Function that will update the chart settings after making changes in the textarea
const updateBarSettings = () => {
  $('.grid-header-container').remove();

  let newSettings = $('#edit-space-settings').val();
  let newSettingsArray = newSettings.split(',');
  let nameHeader = newSettingsArray[0];
  let maxValue = parseInt(newSettingsArray[1]);
  let minValue = parseInt(newSettingsArray[2]);
  let tickBy = parseInt(newSettingsArray[2]);
  let ticks = maxValue/tickBy;

  let $gridHeaderContainer = $('<div/>', {
        class: 'grid-header-container',
        style: 'grid-template-columns: 300px repeat(' + ticks + ', 1fr)'
      }),
      $nameHeader = $('<div/>', {class: 'name-header', text: nameHeader});

  $gridHeaderContainer.append($nameHeader).prependTo('#container');

  for (let j = 0; j < ticks; j++) {
    let $valueHeader = $('<div/>', {class: 'value-header', text: (minValue += tickBy) - tickBy});
    $gridHeaderContainer.append($valueHeader).appendTo('#container');
  };

  let barNames = $('.name');
  let barNamesArray = [];
  let barValues = $('.value');
  let barValuesArray = [];
  for (let x = 0; x < barNames.length; x++) {
    barNamesArray.push(barNames.eq(x).text());
  }
  for (let y = 0; y < barValues.length; y++) {
    barValuesArray.push(barValues.eq(y).text());
  }
  let data = barNamesArray.concat(barValuesArray);

  $('.grid-container').remove();

  for (let i = 0; i < data.length/2; i++) {
    let colorR = Math.floor((Math.random() * 256));
    let colorG = Math.floor((Math.random() * 256));
    let colorB = Math.floor((Math.random() * 256));
    let rgb = `${colorR}, ${colorG}, ${colorB}`;
    let realWidth = Math.floor((data[i+(data.length/2)] /maxValue)*100);

    let $gridContainer = $('<div/>', {class: 'grid-container'}),
        $gridName = $('<div/>', {class: 'name', text: data[i], style: 'background-color: rgb(' + rgb + ');'}),
        $gridValue = $('<div/>', {
          class: 'value',
          text: data[i+(data.length/2)],
          style: 'width: ' + realWidth + '%;' + 'background-color: rgb(' + rgb + ');'});

    $gridContainer.append($gridName).appendTo('#container');
    $gridContainer.append($gridValue).appendTo('#container');
  };
};

//Function grabs the current title into the textarea for user to make changes
const editTitle = () => {
  let title = $('h1').text()
  $('#edit-title').text(title);
}

// Function that will allow the user to change chart's title
const updateBarTitle = () => {
  $('h1').remove();
  let title = $('#edit-title').val();
  let $newTitle = $('<h1/>', {text: title});
  $newTitle.appendTo('.bar-title');
};


$('.navigation-buttons').click(navigationButtons);
$('.confirmation-buttons').click(confirmationButtons);
