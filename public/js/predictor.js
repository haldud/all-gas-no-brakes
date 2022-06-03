var anyInjuryModel = loadAnyInjuryModel().then((model) => {
  console.log('Any injury model loaded:', model);
  let modelInput = getModelInputBasedOnProvidedFields();
  console.log("model input:", modelInput);
  predictAnyInjury(modelInput);
})
.catch((error) => {
  console.log('Error:', error)
});

var seriousInjuryModel = loadSeriousInjuryModel().then((model) => {
  console.log('Serious injury model loaded:', model);
  let modelInput = getModelInputBasedOnProvidedFields();
  console.log("model input:", modelInput);
  predictSeriousInjury(modelInput);
})
.catch((error) => {
  console.log('Error:', error)
});

var fatalInjuryModel = loadFatalInjuryModel().then((model) => {
  console.log('Fatal injury model loaded:', model);
  let modelInput = getModelInputBasedOnProvidedFields();
  console.log("model input:", modelInput);
  predictFatalInjury(modelInput);
})
.catch((error) => {
  console.log('Error:', error)
});

function predictInjury() {
  console.log("predicting injury...");

  // Get the model to use with predictions.
  var modelInput = getModelInputBasedOnProvidedFields();
  console.log("model input:", modelInput);

  predictAnyInjury(modelInput);
  predictSeriousInjury(modelInput);
  predictFatalInjury(modelInput);
}

function predictAnyInjury(modelInput) {
  console.log("predicting any injury...");
  var anyInjuryResult = anyInjuryModel.predict(modelInput);
  console.log("any injury prediction:", anyInjuryResult);
  var data = anyInjuryResult.dataSync();
  console.log("any injury prediction data:", data);
  setPredictionPercentage(data, 'any-injury-prediction', 'Any injury')
  drawLikelihoodChart('any-injury-prediction', Math.round(data[0] * 100), 'Likelihood of any injury');
}

function predictSeriousInjury(modelInput) {
  console.log("predicting serious injury...");
  var seriousInjuryResult = seriousInjuryModel.predict(modelInput);
  console.log("serious injury prediction:", seriousInjuryResult);
  var data = seriousInjuryResult.dataSync();
  console.log("serious injury prediction data:", data);
  setPredictionPercentage(data, 'serious-injury-prediction', 'Serious injury')
  drawLikelihoodChart('serious-injury-prediction', Math.round(data[0] * 100), 'Likelihood of serious injury');
}

function predictFatalInjury(modelInput) {
  console.log("predicting fatal injury...");
  var fatalInjuryResult = fatalInjuryModel.predict(modelInput);
  console.log("fatal injury prediction:", fatalInjuryResult);
  var data = fatalInjuryResult.dataSync();
  console.log("fatal injury prediction data:", data);
  setPredictionPercentage(data, 'fatal-injury-prediction', 'Fatal injury')
  drawLikelihoodChart('fatal-injury-prediction', Math.round(data[0] * 100), 'Likelihood of fatal injury');
}

function setPredictionPercentage(data, elementId, label) {
  var percentage = data[0];
  var element = document.getElementById(elementId);
  element.innerHTML = '<b>' + label + ':</b> ' + Number(percentage).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2});
}

function getModelInputBasedOnProvidedFields() {
  // Get all of the elements that represent input.
  var lightConditions = document.getElementById("light-conditions");

  // Log provided values.
  console.log("light conditions:", lightConditions.value);

  // Pass provided values to get model input.
  var modelInput = getModelInput(lightConditions.value);

  return modelInput;
}

function getModelInput(lightConditions) {
  let vectorInput = [[
      0, //urbancity
      0, //hour
      0, //alcohol
      0, //wrk_zone
      0, //numoccs
      0, //tow_vehname
      0, //trav_speed
      0, //speedrelname
      0, //vspd_lim
      0, //mod_year
      0, //rest_misname
      0, //helm_usename
      0, //helm_misname
      0, //drinkingname
      0, //drugsname
      0, //sex_imname
      0, //age_im
      0, //alc_resname_08
      0, //month_Apr
      0, //month_Aug
      0, //month_Dec
      0, //month_Feb
      0, //month_Jan
      0, //month_Jul
      0, //month_Jun
      0, //month_Mar
      0, //month_May
      0, //month_Nov
      0, //month_Oct
      0, //month_Sep
      0, //day_week_Fri
      0, //day_week_Mon
      0, //day_week_Sat
      0, //day_week_Sun
      0, //day_week_Thus
      0, //day_week_Tues
      0, //day_week_Wed
      (lightConditions == 'dark') ? 1 : 0, //lgt_cond_dark
      (lightConditions == 'dawn') ? 1 : 0, //lgt_cond_dawn
      (lightConditions == 'daylight') ? 1 : 0, //lgt_cond_daylight
      (lightConditions == 'dusk') ? 1 : 0, //lgt_cond_dusk
      (lightConditions == 'other') ? 1 : 0, //lgt_cond_other
      0, //weather_blowing_dirt
      0, //weather_clear
      0, //weather_cloudy
      0, //weather_fog_smoke
      0, //weather_freezing_rain
      0, //weather_other
      0, //weather_rain_sleet
      0, //weather_snow_blowsnow
      0, //weather_windy
      0, //m_harmname_harm_barrier
      0, //m_harmname_harm_fire
      0, //m_harmname_harm_fixed_manmade
      0, //m_harmname_harm_injury_fallout
      0, //m_harmname_harm_lost_control
      0, //m_harmname_harm_moving_veh
      0, //m_harmname_harm_nat_object
      0, //m_harmname_harm_object
      0, //m_harmname_harm_parked_veh
      0, //m_harmname_harm_ped_animal
      0, //m_harmname_harm_terrain
      0, //m_harmname_harm_train
      0, //m_harmname_harm_unknown
      0, //m_harmname_harm_water
      0, //deformedname_Disabling Damage
      0, //deformedname_Functional Damage
      0, //deformedname_Minor Damage
      0, //deformedname_No Damage
      0, //vtrafwayname_Exit_on_ramp
      0, //vtrafwayname_One-way
      0, //vtrafwayname_Parking_lot_driveway
      0, //vtrafwayname_Two-way
      0, //vtrafwayname_Two_way
      0, //vtrafwayname_Two_way_div_med_bar
      0, //vtrafwayname_Two_way_div_med_nobar	
      0, //bdytyp_imname_2_door_sedan
      0, //bdytyp_imname_4_door_sedan
      0, //bdytyp_imname_ATV_rec_vehicle	
      0, //bdytyp_imname_Bus
      0, //bdytyp_imname_Construction_farm_equip
      0, //bdytyp_imname_Convertable
      0, //bdytyp_imname_Large_SUV
      0, //bdytyp_imname_Motorcylcle_trike
      0, //bdytyp_imname_Motorhome_RV
      0, //bdytyp_imname_Small_SUV_light_truck
      0, //bdytyp_imname_Truck
      0, //bdytyp_imname_Van
      0, //p_crash1name_Changing Lanes
      0, //p_crash1name_Diasbled_parked
      0, //p_crash1name_Going straight
      0, //p_crash1name_Making a U-turn	
      0, //p_crash1name_Merging
      0, //p_crash1name_Negotiating a Curve
      0, //p_crash1name_Passing or Overtaking Another Vehicle
      0, //p_crash1name_Start on road
      0, //p_crash1name_Stopping_backup
      0, //p_crash1name_Successful Avoidance Maneuver to a Previous Critical Event
      0, //p_crash1name_Turning Left
      0, //p_crash1name_Turning Right
      0, //rest_usename_Child_restraint
      0, //rest_usename_Harness
      0, //rest_usename_No_seatbelt
      0, //rest_usename_Seatbelt
      0, //seat_imname_Cargo_area
      0, //seat_imname_Driver
      0, //seat_imname_Front_passenger
      0, //seat_imname_Riding_outside
      0, //seat_imname_Second_row
      0, //seat_imname_Third_or_4 Row
      0, //seat_imname_Trailer
      0, //make_country_make_China
      0, //make_country_make_England
      0, //make_country_make_Germany
      0, //make_country_make_Italy
      0, //make_country_make_Japan
      0, //make_country_make_Korea
      0, //make_country_make_Sweden
      0, //make_country_make_US
      0, //make_country_make_US_truck
      0, //make_country_make_motorcycle
      0  //make_country_make_other
  ]];

  console.log('vector input:', vectorInput);

  return tf.tensor(vectorInput);
}

function drawLikelihoodChart(id, percent, label) {
  new Chart(id, {
    type: 'doughnut',
    data: {
      datasets: [{
        label: label,
        percent: percent,
        backgroundColor: ['#5283ff']
      }]
    },
    plugins: [{
        beforeInit: (chart) => {
          const dataset = chart.data.datasets[0];
          chart.data.labels = [dataset.label];
          dataset.data = [dataset.percent, 100 - dataset.percent];
        }
      },
      {
        beforeDraw: (chart) => {
          var width = chart.chart.width,
            height = chart.chart.height,
            ctx = chart.chart.ctx;
          ctx.restore();
          var fontSize = (height / 100).toFixed(2);
          ctx.font = fontSize + "em sans-serif";
          ctx.fillStyle = "#9b9b9b";
          ctx.textBaseline = "middle";
          var text = chart.data.datasets[0].percent + "%",
            textX = Math.round((width - ctx.measureText(text).width) / 2),
            textY = height / 2;
          ctx.fillText(text, textX, textY);
          ctx.save();
        }
      }
    ],
    options: {
      maintainAspectRatio: false,
      cutoutPercentage: 75,
      rotation: Math.PI / 2,
      legend: {
        display: false,
      },
      tooltips: {
        filter: tooltipItem => tooltipItem.index == 0
      }
    }
  });
}

async function loadAnyInjuryModel() {
    anyInjuryModel = await tf.loadLayersModel('./tfjs-any/model.json');
    return anyInjuryModel;
}

async function loadSeriousInjuryModel() {
    seriousInjuryModel = await tf.loadLayersModel('./tfjs-serious/model.json');
    return seriousInjuryModel;
}

async function loadFatalInjuryModel() {
    fatalInjuryModel = await tf.loadLayersModel('./tfjs-fatal/model.json');
    return fatalInjuryModel;
}
