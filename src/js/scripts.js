//Function to fixed tabbar on top
function affixTab (element) {
    var $onScreenElement = $('[data-lf-pos-onscreen]');
    var $windowElement = $(window);
    var offsetTop = $('[data-lf-header]').css('position') === 'fixed' ? $('[data-lf-header]').height() : 0;
    if ($onScreenElement.offset().top-$windowElement.scrollTop() < offsetTop) {
        element.addClass('affix');
        var tabHeight = element.height();
        $('[data-lf-pos-scrolling]').css({'padding-top': tabHeight});
    } else {
        element.removeClass('affix');
        $('[data-lf-pos-scrolling]').css({'padding-top': '0'});
    }
}

//Fcuntion to capitalized letters
function capitalizeLetter(str) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

//Function to get multiple parameters un URL
var getMutipleParameters = function(search_string) {

    var parseParameter = function(params, pairs) {
        var pair = pairs[0];
        var parts = pair.split('=');
        var key = decodeURIComponent(parts[0]);
        var value = decodeURIComponent(parts.slice(1).join('='));

        // Handle multiple parameters of the same name
        if (typeof params[key] === 'undefined') {
            params[key] = value;
        } else {
            params[key] = [].concat(params[key], value);
        }

        return pairs.length === 1 ? params : parseParameter(params, pairs.slice(1));
    };

    // Get rid of leading ?
    return search_string.length === 0 ? {} : parseParameter({}, search_string.substr(1).split('&'));
};

//Function to close Cookie Law
function closeCookieAlert () {
    $.cookie('allowCookies', 'allow', {expires: 30});
    $('[data-lf-cookielaw]').hide();
}

//Function to get one parameter URL
function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,''])[1].replace(/\+/g, '%20'))||null;
}

//Function to initialize Cookie Law
function initCookieLaw () {
    if($.cookie('allowCookies') == null) {
        $('[data-lf-cookielaw]').show();
    }
}

//Function to initialize hours closing timer
/* jshint ignore:start */
function initHoursTimer (open, close, id, status, display) {
    var diffClose, diffOpen, closeTimer;

    if(display === 'hide') {
        $('[data-timer-id]').hide();
    }
    else if(id === null && status === 'closed') {
        $('[data-lf-pos-hours-timer-open], [data-lf-pos-hours-timer-closing]').hide();
        $('[data-lf-pos-hours-timer-close]').show();
    }
    else if(id !== null && status === 'closed') {
        $('[data-timer-id="' + id + '"] [data-lf-pos-hours-timer-open], [data-timer-id="' + id + '"] [data-lf-pos-hours-timer-closing]').hide();
        $('[data-timer-id="' + id + '"] [data-lf-pos-hours-timer-close]').show();
    }
    else if(status === 'open') {
        if(open.length === 1) {
            diffOpen = moment(open[0], 'HH:mm').diff(moment());
            diffClose = moment(close[0], 'HH:mm').diff(moment());
        }
        else {
            diffOpen = moment(open[0], 'HH:mm').diff(moment());
            diffClose = moment(close[0], 'HH:mm').diff(moment());

            if(diffOpen <= 0 && diffClose <= 0) {
                diffOpen = moment(open[1], 'HH:mm').diff(moment());
            }
            if(diffClose <= 0) {
                diffClose = moment(close[1], 'HH:mm').diff(moment());
            }
        }

        if(diffOpen > 0 || diffClose < 0 || diffClose <= 60000) {
            if(id === null) {
                $('[data-lf-pos-hours-timer-open], [data-lf-pos-hours-timer-closing]').hide();
                $('[data-lf-pos-hours-timer-close]').show();
            }
            else if(id !== null) {
                $('[data-timer-id="' + id + '"] [data-lf-pos-hours-timer-open], [data-timer-id="' + id + '"] [data-lf-pos-hours-timer-closing]').hide();
                $('[data-timer-id="' + id + '"] [data-lf-pos-hours-timer-close]').show();
            }
        }
        else if (diffClose > 60000 && diffClose < 3600000) {
            closeTimer = moment.utc(diffClose).format('mm');
            if(id === null) {
                $('[data-lf-pos-hours-timer-count]').prepend(closeTimer);
                $('[data-lf-pos-hours-timer-close], [data-lf-pos-hours-timer-open]').hide();
                $('[data-lf-pos-hours-timer-closing]').show();
            }
            else if(id !== null) {
                $('[data-timer-id="' + id + '"] [data-lf-pos-hours-timer-count]').prepend(closeTimer);
                $('[data-timer-id="' + id + '"] [data-lf-pos-hours-timer-close], [data-timer-id="' + id + '"] [data-lf-pos-hours-timer-open]').hide();
                $('[data-timer-id="' + id + '"] [data-lf-pos-hours-timer-closing]').show();
            }
        }
        else {
            if(id === null) {
                $('[data-lf-pos-hours-timer-close], [data-lf-pos-hours-timer-closing]').hide();
                $('[data-lf-pos-hours-timer-open]').show();
            }
            else if(id !== null) {
                $('[data-timer-id="' + id + '"] [data-lf-pos-hours-timer-close], [data-timer-id="' + id + '"] [data-lf-pos-hours-timer-closing]').hide();
                $('[data-timer-id="' + id + '"] [data-lf-pos-hours-timer-open]').show();
            }
        }
    }
}

function initToday () {
    var today = moment().day() - 1 ;
    (today === -1 ? today = 6 : today = today);
    $('[data-lf-pos-hours-row]').each(function(){
        var hoursRowId = $(this).data('lf-pos-hours-row');
        $('[data-lf-pos-hours-row="' + hoursRowId + '"] [data-lf-pos-hours-column]:eq(' + today + ')').addClass('pos__hours--today').attr('data-lf-pos-hours-today','');
    });
    var todayHtml = $('[data-lf-pos-hours-today]').html();
    $('[data-lf-pos-hours-mobile]').prepend(todayHtml);
    $('[data-lf-pos-hours-mobile] span[data-normal-hours]').remove();
}
/* jshint ignore:end */

//Function to initialize select dropdown
function initSelect (element) {
    element.selectpicker({style: 'btn-info'});
    element.selectpicker('render');
}

//Function to display cities for autocomplete
function parseCities(data, local){
    var cities = [];
    //if country selector is active
    if(local) {
        for(var k = 0; k < data[local].length; k++) {
            cities[k] = capitalizeLetter(data[local][k]);
        }
    }
    //if not we display all cities from all countries
    else {
        var key = Object.keys(data);
        var c = 0;
        for(var i = 0; i < key.length; i++) {
            for(var j = 0; j < data[key[i]].length; j++) {
                cities[c] = capitalizeLetter(data[key[i]][j]);
                c++;
            }
        }
    }
    $('input[data-lf-searchform-query]').typeahead({
        selector: {
            dropdown: 'dropdown-menu dropdown-menu-right',
            list: 'dropdown-menu',
            hint: 'form-control'
        },
        source: {
            data: cities
        }
    });
}

//Function to scrolldown on specific section
function scrollToItem (tabId) {
    var tabHeight = $('[data-lf-pos-tabs]').height();
    $('html, body').animate({
        scrollTop: $('#' + tabId).offset().top  - tabHeight
    }, 0);
    return false;
}

//Function to order smart tags
$.fn.smartTagOrder = function(option) {
    return this.each(function() {
        var $this = $(this);
        var nbCol;
        if (typeof option === 'string' || typeof option === 'number') {
            nbCol = parseInt(option);
        } else {
            nbCol = 2;
        }
        var stArrElt = [];
        $this.find('[data-st-ordered^="index"]').each(function() {
            var stclass = $(this).attr('data-st-ordered');
            stclass = stclass.replace('index', '');
            if (stclass !== '') {
                stArrElt[stclass] = $(this);
            }
        });
        for (var ist = 0; ist < stArrElt.length; ist++) {
            $($this).append(stArrElt[ist]);
        }
        ist = 0;
    });
};

$(document).ready(function() {

    var $posTabs = $('[data-lf-pos-tabs]'),
        originFromUrl = getURLParameter('origin'),
        lastKnowOrigin,
        localCountry = $('select[data-lf-searchform-country]').val(),
        dataJson,
        countryCode = getURLParameter('country'),
        $countrySelector = $('select[data-lf-searchform-country]'),
        $phoneSelector = $('select[data-lf-pos-addressrequest-countrycode]'),
        $filterSelector = $('select[data-lf-searchform-filters]'),
        selectedFilters = [].concat(getMutipleParameters(location.search)['st_any[SERVICES][]']),
        tabsNumber = $('[data-tabs-id]').length;
    /* jshint ignore:start */
    var timeOpen = [],
        timeClose = [],
        timeBool = true,
        status,
        timerDisplay,
        timerId;

    //Initialize today class
    initToday();
    /* jshint ignore:end */

    //Initialize cookielaw
    initCookieLaw();

    //Close alerts
    $('[data-lf-geolocalert-close]').click(function(){
        $('[data-lf-geolocalert]').hide();
    });

    //Enable scrolling on map
    $('[data-lf-result-map], [data-lf-pos-map]').on('lf.mapReady', function(e, lfMap) {
        lfMap.map.setOptions({
            scrollwheel: true
        });
    });

    //Set all tabs with same width
    $('[data-tabs-id]').width(100/tabsNumber + '%');

    //Initialize Carousel
    $('[data-lf-carousel]').each(function() {
        if($(this).length > 0) {
            $(this).find('.carousel-inner .item:first, .carousel-indicators li:first').addClass('active');
            $(this).carousel({
                interval: 5000
            });

            $(this).hammer().on('swipeleft', function(){
                $(this).carousel('next');
            });
            $(this).hammer().on('swiperight', function(){
                $(this).carousel('prev');
            });
        }
    });

    //Hide header/footer if sepific URL parameter is set
    if(originFromUrl !== null) {
        $.cookie('origin', originFromUrl, { path: '/' });
        lastKnowOrigin = originFromUrl;
    }
    else {
        //Use the existing cookie value
        lastKnowOrigin = $.cookie('origin');
    }
    if(lastKnowOrigin === 'mobileapp') {
        $('[data-lf-header], [data-lf-footer]').addClass('hidden-xs');
    }

    //Create cookie when click on any link
    $('a').click(function (){
        closeCookieAlert();
    });

    //Add affix class on tab when scrolling down
    if($posTabs.length) {
        affixTab($posTabs);
        $(window).scroll(function() {
            affixTab($posTabs);
        });
    }

    //Ordered smart tags
    $('[data-lf-sortedcolumns]').smartTagOrder();

    //Show/hide new search button on LIST & POS page
    $('[data-lf-newsearch-button]').click(function(){
        $('[data-lf-searchform]').slideToggle();
        $('[data-lf-newsearch]').hide();
    });

    //Show hours on mobile when click on button
    $('[data-lf-pos-hours-show]').click(function(){
        var hoursRowId = $(this).data('lf-pos-hours-show');
        $('[data-lf-pos-hours-row="' + hoursRowId + '"]').slideToggle();
        $(this).hide();
        $('[data-lf-pos-hours-mobile="' + hoursRowId + '"]').hide();
    });

    //Go on POS page
    $('[data-lf-result-content]').click(function(e) {
        e.preventDefault();
        var linkHref = $(this).data('url');
        if (linkHref) {
            window.location.href = linkHref;
        }
    });

    //Autocomplete (Start)
    $('select[data-lf-searchform-country]').change(function(){
        var localUpdate = $('select[data-lf-searchform-country]').val();
        parseCities(dataJson, localUpdate);
    });

    $.ajax({
        url: window.location.protocol + '//' + window.location.hostname + '/cities.json',
        type: 'GET',
        dataType: 'json',
        success: function(data){
            dataJson = data;
            parseCities(data, localCountry);
        }
    });
    //Autocomplete (End)

    //Form Validation (Start)
    $('[data-lf-searchform] form').formValidation({
        framework: 'bootstrap',
        // Excluding disabled is required for using with bootstrap-select
        excluded: ':disabled',
        err: {
            container: '.popover-content'
        }
    })
    .on('err.field.fv', function() {
        $('input[data-lf-searchform-query]').popover({
            html: true,
            trigger: 'manual',
            template: '<div class="popover" role="tooltip"><div class="arrow"></div><div class="popover-content"></div></div>'
        });
        $('input[data-lf-searchform-query]').popover('show');
    })
    .on('success.field.fv', function() {
        $('input[data-lf-searchform-query]').popover('destroy');
    });

    $('form[data-lf-pos-contactform]').formValidation({
        framework: 'bootstrap'
    })
    .on('success.form.fv', function() {
        return false;
    })
    .on('success.field.fv', function(e, data) {
        if (data.fv.getSubmitButton()) {
            data.fv.disableSubmitButtons(false);
        }
    });

    $('form[data-lf-pos-itinerary]').formValidation({
        framework: 'bootstrap'
    })
    .on('success.form.fv', function() {
        return false;
    });

    $('form[data-lf-pos-newsletter]').formValidation({
        framework: 'bootstrap',
        fields: {
            email: {
                selector: 'input[data-lf-pos-newsletter-email]',
                trigger: 'blur'
            }
        }
    })
    .on('success.form.fv', function() {
        return false;
    });

    // If sms country is changed manually
    $('select[data-lf-pos-addressrequest-countrycode]').change(function() {
        // Getting the country code corresponding to the selected country
        var codeSelected = $(this).children('option:selected').data('country-code');
        // Assigning it to a hidden select.
        $('select[data-lf-pos-addressrequest-countryiso]').val(codeSelected);

        // Updating the language used in form validation
        $('form[data-lf-pos-addressrequest]').formValidation('updateOption', 'sms', 'validators', 'phone', 'country', codeSelected);
        // And revalidating the field.
        $('form[data-lf-pos-addressrequest]').formValidation('revalidateField', 'email');
        $('form[data-lf-pos-addressrequest]').formValidation('revalidateField', 'sms');
    });
    //Form Validation (End)

    //Set country and categorie to research value (Start)
    if(countryCode == null) {
        $.getJSON('/geocode.json', function(data){
            $countrySelector.find('option[value='+ data.country_code + ']').attr('selected', true);
            $phoneSelector.find('option[data-country-code='+ data.country_code.toUpperCase() + ']').attr('selected', true);
            $phoneSelector.trigger('change');
            initSelect($countrySelector);
            initSelect($phoneSelector);
        });
    }
    else {
        $countrySelector.find('option[value='+ countryCode + ']').attr('selected', true);
        $phoneSelector.find('option[data-country-code='+ countryCode + ']').attr('selected', true);
        $phoneSelector.trigger('change');
        initSelect($countrySelector);
        initSelect($phoneSelector);
    }

    for(var i = 0; i < selectedFilters.length; i++){
        $filterSelector.find('option[value="'+ selectedFilters[i] + '"]').attr('selected', true);
    }
    initSelect($filterSelector);
    //Set country and categorie to research value (End)

    //Show phone number on Pos page
    $('[data-lf-pos-showphone]').click(function(){
        $(this).addClass('hidden');
        $('[data-lf-pos-phone], [data-lf-pos-fax]').removeClass('hidden');
    });

    //Show phone number on map popup
    $(document).on('click', '[data-lf-markerpopup-showphone]', function(){
        $(this).addClass('hidden');
        $('[data-lf-markerpopup-phone]').removeClass('hidden');
    });

    //Stop propagation when click on phone number button
    $('[data-lf-result-phone-button]').click(function(e){
        e.stopPropagation();
    });

    //Show phone number on List page
    $('[data-lf-result-showphone]').click(function(e){
        e.stopPropagation();
        e.preventDefault();
        var posId = $(this).data('pos-id');
        $(this).addClass('hidden');
        $('[data-lf-result-phone][data-pos-id="' + posId + '"], [data-lf-result-phone-button][data-pos-id="' + posId + '"]').removeClass('hidden');
    });

    //Scroll tabs
    $('[data-tabs-id] a').click(function(e){
        e.preventDefault();
    });

    $('[data-tabs-id]').click(function() {
        var tabId = $(this).data('tabs-id');
        scrollToItem(tabId);
    });

    /* jshint ignore:start */
    //Opening left time
    if($('[data-lf-pos-hours-exceptionnal]').length){
        var now = moment().format('YYYY-MM-DD');
        var dayTime = moment(now).utc().format('x');

        $('[data-other-hours]').each(function(){
            var dayStart = moment($(this).data('day-start'), 'YYYY-MM-DD').utc().format('x');
            var dayEnd  = moment($(this).data('day-end'), 'YYYY-MM-DD').utc().format('x');
            if(!dayEnd) {
                dayEnd = dayStart;
            }
            if(dayTime >= dayStart && dayTime <= dayEnd) {
                var dataStatus = $(this).data('status');
                if(dataStatus === 'closed') {
                    status = 'closed';
                    timeBool = false;
                }
                else {
                    var dataTimeStartAm = $(this).data('time-start-am');
                    var dataTimeStartPm = $(this).data('time-start-pm');
                    var dataTimeEndAm = $(this).data('time-end-am');
                    var dataTimeEndPm = $(this).data('time-end-pm');
                    if(dataTimeStartAm) {
                        timeOpen[0] = dataTimeStartAm;
                    }
                    if(dataTimeStartPm) {
                        timeOpen[1] = dataTimeStartPm;
                    }
                    if(dataTimeEndAm) {
                        timeClose[0] = dataTimeEndAm;
                    }
                    if(dataTimeEndPm) {
                        timeClose[1] = dataTimeEndPm;
                    }
                    if(!dataTimeStartAm && !dataTimeStartPm && !dataTimeEndAm && !dataTimeEndPm) {
                        timerDisplay = 'hide';
                    }
                    status = 'open';
                    timeBool = false;
                }
                initHoursTimer(timeOpen, timeClose, null, status, timerDisplay)
            }
        });
    }
    if(timeBool) {
        $('[data-lf-pos-hours-row]').each(function(){
            timerId = $(this).data('lf-pos-hours-row');
            $('[data-lf-pos-hours-row="' + timerId + '"] [data-lf-pos-hours-today] [data-normal-hours]').each(function() {
                var dataStatus = $(this).data('status');
                if(dataStatus === 'closed') {
                    status = 'closed';
                }
                else {
                    var dataTimeIndex = $(this).data('index');
                    var dataTimeOpen = $(this).data('time-open');
                    var dataTimeClose = $(this).data('time-close');
                    timeOpen[dataTimeIndex] = dataTimeOpen;
                    timeClose[dataTimeIndex] = dataTimeClose;
                    status = 'open';
                }
            });
            initHoursTimer(timeOpen, timeClose, timerId, status, null)
        });
    }
    /* jshint ignore:end */
});
