import { Weather } from "./Weather";

export const getDayStr = (date) => {
	const days = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', ];
	return days[date.getUTCDay()];
};

const normaliseTime = (time) => {
	return time < 10 ? '0' + time : time;
}

export const getTimeStr = (date) => {
	const h = date.getUTCHours();
	const m = date.getUTCMinutes();
	return `${ normaliseTime(h) }:${ normaliseTime(m) }`
};

export const parseWeatherResponse = (weatherResponse) => {
	return new Weather(weatherResponse)
};
/**
 *
 * @param {Object[]} list WeatherResponse
 * @returns {Promise<Weather[]>}
 */
export const reduceForecast = (list = []) => {
	const groupedForecastByDays = [];
	let i = 0;
	let finished = false;
	while (!finished) {
		for (let j = 0; j < list.length; j += 1) {
			const tmp = parseWeatherResponse(list[j]);
			if (!groupedForecastByDays[i]) {
				groupedForecastByDays.push([ tmp ]);
			} else {
				if (tmp.date.getDay() === groupedForecastByDays[i][groupedForecastByDays[i].length - 1].date.getDay()) {
					groupedForecastByDays[i].push(tmp);
				} else {
					i++;
				}
			}
			if (j === list.length - 1) {
				finished = true;
			}
		}
	}

	const checkProperty = (weather, weatherData) => {
		for (let key in weather) {
			if (weather.hasOwnProperty(key)) {
				if (typeof weather[key] === "number" && key.indexOf('max') >= 0  && weather[key] > weatherData[key]) {
					weatherData[key] = weather[key]
				} else if (typeof weather[key] === "number" && key.indexOf('min') >= 0 && weather[key] < weatherData[key]) {
					weatherData[key] = weather[key]
				} else if (typeof weather[key] === "number" && weather[key] > weatherData[key]) {
					weatherData[key] = weather[key]
				} else if (weatherData[key] instanceof Date) {
					weatherData[key] = weather[key]
				} else if (typeof weather[key] === "object") {
					checkProperty(weather[key], weatherData[key])
				}
			}
		}
	};

	const forecast = groupedForecastByDays.reduce((days, weatherForDay) => {
		const weatherData = weatherForDay[0];
		for (let weather of weatherForDay) {
			checkProperty(weather, weatherData)
		}
		days.push(weatherData);
		return days;
	}, []);
	console.log(groupedForecastByDays);
	return forecast;
};


export const makeUrl = (url, query) => {
	if (query.q) {
		url += `&q=${ query.q }`;
	} else if (query.lon && query.lat) {
		url += `&lat=${ query.lat }&lon=${ query.lon }`;
	}

	return url;
}


const fc = [
	{
		"dt": 1591477200,
		"main": {
			"temp": 18.96,
			"feels_like": 19.28,
			"temp_min": 17.87,
			"temp_max": 18.96,
			"pressure": 1012,
			"sea_level": 1013,
			"grnd_level": 998,
			"humidity": 84,
			"temp_kf": 1.09
		},
		"weather": [
			{
				"id": 500,
				"main": "Rain",
				"description": "light rain",
				"icon": "10n"
			}
		],
		"clouds": {
			"all": 75
		},
		"wind": {
			"speed": 2.48,
			"deg": 210
		},
		"rain": {
			"3h": 0.19
		},
		"sys": {
			"pod": "n"
		},
		"dt_txt": "2020-06-06 21:00:00"
	},
	{
		"dt": 1591488000,
		"main": {
			"temp": 17.32,
			"feels_like": 17.47,
			"temp_min": 16.59,
			"temp_max": 17.32,
			"pressure": 1014,
			"sea_level": 1014,
			"grnd_level": 999,
			"humidity": 87,
			"temp_kf": 0.73
		},
		"weather": [
			{
				"id": 804,
				"main": "Clouds",
				"description": "overcast clouds",
				"icon": "04n"
			}
		],
		"clouds": {
			"all": 88
		},
		"wind": {
			"speed": 2.16,
			"deg": 208
		},
		"sys": {
			"pod": "n"
		},
		"dt_txt": "2020-06-07 00:00:00"
	},
	{
		"dt": 1591498800,
		"main": {
			"temp": 16.2,
			"feels_like": 15.57,
			"temp_min": 15.94,
			"temp_max": 16.2,
			"pressure": 1014,
			"sea_level": 1014,
			"grnd_level": 999,
			"humidity": 89,
			"temp_kf": 0.26
		},
		"weather": [
			{
				"id": 803,
				"main": "Clouds",
				"description": "broken clouds",
				"icon": "04d"
			}
		],
		"clouds": {
			"all": 79
		},
		"wind": {
			"speed": 2.89,
			"deg": 155
		},
		"sys": {
			"pod": "d"
		},
		"dt_txt": "2020-06-07 03:00:00"
	},
	{
		"dt": 1591509600,
		"main": {
			"temp": 20.25,
			"feels_like": 20.07,
			"temp_min": 20.25,
			"temp_max": 20.25,
			"pressure": 1014,
			"sea_level": 1014,
			"grnd_level": 999,
			"humidity": 73,
			"temp_kf": 0
		},
		"weather": [
			{
				"id": 803,
				"main": "Clouds",
				"description": "broken clouds",
				"icon": "04d"
			}
		],
		"clouds": {
			"all": 81
		},
		"wind": {
			"speed": 2.7,
			"deg": 148
		},
		"sys": {
			"pod": "d"
		},
		"dt_txt": "2020-06-07 06:00:00"
	},
	{
		"dt": 1591520400,
		"main": {
			"temp": 24.08,
			"feels_like": 23.19,
			"temp_min": 24.08,
			"temp_max": 24.08,
			"pressure": 1015,
			"sea_level": 1015,
			"grnd_level": 1000,
			"humidity": 63,
			"temp_kf": 0
		},
		"weather": [
			{
				"id": 804,
				"main": "Clouds",
				"description": "overcast clouds",
				"icon": "04d"
			}
		],
		"clouds": {
			"all": 86
		},
		"wind": {
			"speed": 4.43,
			"deg": 146
		},
		"sys": {
			"pod": "d"
		},
		"dt_txt": "2020-06-07 09:00:00"
	},
	{
		"dt": 1591531200,
		"main": {
			"temp": 25.71,
			"feels_like": 24.83,
			"temp_min": 25.71,
			"temp_max": 25.71,
			"pressure": 1014,
			"sea_level": 1014,
			"grnd_level": 1000,
			"humidity": 61,
			"temp_kf": 0
		},
		"weather": [
			{
				"id": 803,
				"main": "Clouds",
				"description": "broken clouds",
				"icon": "04d"
			}
		],
		"clouds": {
			"all": 67
		},
		"wind": {
			"speed": 5.01,
			"deg": 143
		},
		"sys": {
			"pod": "d"
		},
		"dt_txt": "2020-06-07 12:00:00"
	},
	{
		"dt": 1591542000,
		"main": {
			"temp": 24.26,
			"feels_like": 24.32,
			"temp_min": 24.26,
			"temp_max": 24.26,
			"pressure": 1013,
			"sea_level": 1013,
			"grnd_level": 999,
			"humidity": 71,
			"temp_kf": 0
		},
		"weather": [
			{
				"id": 804,
				"main": "Clouds",
				"description": "overcast clouds",
				"icon": "04d"
			}
		],
		"clouds": {
			"all": 90
		},
		"wind": {
			"speed": 4.32,
			"deg": 128
		},
		"sys": {
			"pod": "d"
		},
		"dt_txt": "2020-06-07 15:00:00"
	},
	{
		"dt": 1591552800,
		"main": {
			"temp": 19.69,
			"feels_like": 19.71,
			"temp_min": 19.69,
			"temp_max": 19.69,
			"pressure": 1014,
			"sea_level": 1014,
			"grnd_level": 999,
			"humidity": 86,
			"temp_kf": 0
		},
		"weather": [
			{
				"id": 804,
				"main": "Clouds",
				"description": "overcast clouds",
				"icon": "04d"
			}
		],
		"clouds": {
			"all": 93
		},
		"wind": {
			"speed": 3.54,
			"deg": 127
		},
		"sys": {
			"pod": "d"
		},
		"dt_txt": "2020-06-07 18:00:00"
	},
	{
		"dt": 1591563600,
		"main": {
			"temp": 17.76,
			"feels_like": 17.33,
			"temp_min": 17.76,
			"temp_max": 17.76,
			"pressure": 1014,
			"sea_level": 1014,
			"grnd_level": 1000,
			"humidity": 88,
			"temp_kf": 0
		},
		"weather": [
			{
				"id": 804,
				"main": "Clouds",
				"description": "overcast clouds",
				"icon": "04n"
			}
		],
		"clouds": {
			"all": 88
		},
		"wind": {
			"speed": 3.31,
			"deg": 133
		},
		"sys": {
			"pod": "n"
		},
		"dt_txt": "2020-06-07 21:00:00"
	},
	{
		"dt": 1591574400,
		"main": {
			"temp": 16.52,
			"feels_like": 16.05,
			"temp_min": 16.52,
			"temp_max": 16.52,
			"pressure": 1015,
			"sea_level": 1015,
			"grnd_level": 1000,
			"humidity": 86,
			"temp_kf": 0
		},
		"weather": [
			{
				"id": 804,
				"main": "Clouds",
				"description": "overcast clouds",
				"icon": "04n"
			}
		],
		"clouds": {
			"all": 90
		},
		"wind": {
			"speed": 2.56,
			"deg": 139
		},
		"sys": {
			"pod": "n"
		},
		"dt_txt": "2020-06-08 00:00:00"
	},
	{
		"dt": 1591585200,
		"main": {
			"temp": 16.09,
			"feels_like": 15.35,
			"temp_min": 16.09,
			"temp_max": 16.09,
			"pressure": 1014,
			"sea_level": 1014,
			"grnd_level": 999,
			"humidity": 88,
			"temp_kf": 0
		},
		"weather": [
			{
				"id": 801,
				"main": "Clouds",
				"description": "few clouds",
				"icon": "02d"
			}
		],
		"clouds": {
			"all": 11
		},
		"wind": {
			"speed": 2.91,
			"deg": 116
		},
		"sys": {
			"pod": "d"
		},
		"dt_txt": "2020-06-08 03:00:00"
	},
	{
		"dt": 1591596000,
		"main": {
			"temp": 21.2,
			"feels_like": 21.14,
			"temp_min": 21.2,
			"temp_max": 21.2,
			"pressure": 1014,
			"sea_level": 1014,
			"grnd_level": 999,
			"humidity": 78,
			"temp_kf": 0
		},
		"weather": [
			{
				"id": 801,
				"main": "Clouds",
				"description": "few clouds",
				"icon": "02d"
			}
		],
		"clouds": {
			"all": 16
		},
		"wind": {
			"speed": 3.6,
			"deg": 119
		},
		"sys": {
			"pod": "d"
		},
		"dt_txt": "2020-06-08 06:00:00"
	},
	{
		"dt": 1591606800,
		"main": {
			"temp": 25.12,
			"feels_like": 23.88,
			"temp_min": 25.12,
			"temp_max": 25.12,
			"pressure": 1014,
			"sea_level": 1014,
			"grnd_level": 1000,
			"humidity": 64,
			"temp_kf": 0
		},
		"weather": [
			{
				"id": 800,
				"main": "Clear",
				"description": "clear sky",
				"icon": "01d"
			}
		],
		"clouds": {
			"all": 10
		},
		"wind": {
			"speed": 5.66,
			"deg": 129
		},
		"sys": {
			"pod": "d"
		},
		"dt_txt": "2020-06-08 09:00:00"
	},
	{
		"dt": 1591617600,
		"main": {
			"temp": 26.04,
			"feels_like": 24.82,
			"temp_min": 26.04,
			"temp_max": 26.04,
			"pressure": 1013,
			"sea_level": 1013,
			"grnd_level": 998,
			"humidity": 60,
			"temp_kf": 0
		},
		"weather": [
			{
				"id": 800,
				"main": "Clear",
				"description": "clear sky",
				"icon": "01d"
			}
		],
		"clouds": {
			"all": 5
		},
		"wind": {
			"speed": 5.53,
			"deg": 128
		},
		"sys": {
			"pod": "d"
		},
		"dt_txt": "2020-06-08 12:00:00"
	},
	{
		"dt": 1591628400,
		"main": {
			"temp": 25.44,
			"feels_like": 26.09,
			"temp_min": 25.44,
			"temp_max": 25.44,
			"pressure": 1012,
			"sea_level": 1012,
			"grnd_level": 997,
			"humidity": 69,
			"temp_kf": 0
		},
		"weather": [
			{
				"id": 800,
				"main": "Clear",
				"description": "clear sky",
				"icon": "01d"
			}
		],
		"clouds": {
			"all": 0
		},
		"wind": {
			"speed": 3.9,
			"deg": 131
		},
		"sys": {
			"pod": "d"
		},
		"dt_txt": "2020-06-08 15:00:00"
	},
	{
		"dt": 1591639200,
		"main": {
			"temp": 20.83,
			"feels_like": 21.35,
			"temp_min": 20.83,
			"temp_max": 20.83,
			"pressure": 1012,
			"sea_level": 1012,
			"grnd_level": 997,
			"humidity": 85,
			"temp_kf": 0
		},
		"weather": [
			{
				"id": 800,
				"main": "Clear",
				"description": "clear sky",
				"icon": "01d"
			}
		],
		"clouds": {
			"all": 0
		},
		"wind": {
			"speed": 3.38,
			"deg": 102
		},
		"sys": {
			"pod": "d"
		},
		"dt_txt": "2020-06-08 18:00:00"
	},
	{
		"dt": 1591650000,
		"main": {
			"temp": 18.81,
			"feels_like": 18.45,
			"temp_min": 18.81,
			"temp_max": 18.81,
			"pressure": 1013,
			"sea_level": 1013,
			"grnd_level": 998,
			"humidity": 88,
			"temp_kf": 0
		},
		"weather": [
			{
				"id": 800,
				"main": "Clear",
				"description": "clear sky",
				"icon": "01n"
			}
		],
		"clouds": {
			"all": 0
		},
		"wind": {
			"speed": 3.79,
			"deg": 107
		},
		"sys": {
			"pod": "n"
		},
		"dt_txt": "2020-06-08 21:00:00"
	},
	{
		"dt": 1591660800,
		"main": {
			"temp": 17.38,
			"feels_like": 16.72,
			"temp_min": 17.38,
			"temp_max": 17.38,
			"pressure": 1013,
			"sea_level": 1013,
			"grnd_level": 998,
			"humidity": 89,
			"temp_kf": 0
		},
		"weather": [
			{
				"id": 800,
				"main": "Clear",
				"description": "clear sky",
				"icon": "01n"
			}
		],
		"clouds": {
			"all": 0
		},
		"wind": {
			"speed": 3.54,
			"deg": 119
		},
		"sys": {
			"pod": "n"
		},
		"dt_txt": "2020-06-09 00:00:00"
	},
	{
		"dt": 1591671600,
		"main": {
			"temp": 16.85,
			"feels_like": 16.93,
			"temp_min": 16.85,
			"temp_max": 16.85,
			"pressure": 1013,
			"sea_level": 1013,
			"grnd_level": 998,
			"humidity": 91,
			"temp_kf": 0
		},
		"weather": [
			{
				"id": 800,
				"main": "Clear",
				"description": "clear sky",
				"icon": "01d"
			}
		],
		"clouds": {
			"all": 0
		},
		"wind": {
			"speed": 2.38,
			"deg": 119
		},
		"sys": {
			"pod": "d"
		},
		"dt_txt": "2020-06-09 03:00:00"
	},
	{
		"dt": 1591682400,
		"main": {
			"temp": 22.08,
			"feels_like": 22.07,
			"temp_min": 22.08,
			"temp_max": 22.08,
			"pressure": 1013,
			"sea_level": 1013,
			"grnd_level": 999,
			"humidity": 76,
			"temp_kf": 0
		},
		"weather": [
			{
				"id": 800,
				"main": "Clear",
				"description": "clear sky",
				"icon": "01d"
			}
		],
		"clouds": {
			"all": 0
		},
		"wind": {
			"speed": 3.79,
			"deg": 113
		},
		"sys": {
			"pod": "d"
		},
		"dt_txt": "2020-06-09 06:00:00"
	},
	{
		"dt": 1591693200,
		"main": {
			"temp": 25.88,
			"feels_like": 25.13,
			"temp_min": 25.88,
			"temp_max": 25.88,
			"pressure": 1013,
			"sea_level": 1013,
			"grnd_level": 999,
			"humidity": 63,
			"temp_kf": 0
		},
		"weather": [
			{
				"id": 800,
				"main": "Clear",
				"description": "clear sky",
				"icon": "01d"
			}
		],
		"clouds": {
			"all": 0
		},
		"wind": {
			"speed": 5.24,
			"deg": 120
		},
		"sys": {
			"pod": "d"
		},
		"dt_txt": "2020-06-09 09:00:00"
	},
	{
		"dt": 1591704000,
		"main": {
			"temp": 27.34,
			"feels_like": 26.81,
			"temp_min": 27.34,
			"temp_max": 27.34,
			"pressure": 1012,
			"sea_level": 1012,
			"grnd_level": 998,
			"humidity": 59,
			"temp_kf": 0
		},
		"weather": [
			{
				"id": 800,
				"main": "Clear",
				"description": "clear sky",
				"icon": "01d"
			}
		],
		"clouds": {
			"all": 0
		},
		"wind": {
			"speed": 5.13,
			"deg": 125
		},
		"sys": {
			"pod": "d"
		},
		"dt_txt": "2020-06-09 12:00:00"
	},
	{
		"dt": 1591714800,
		"main": {
			"temp": 26.83,
			"feels_like": 28.28,
			"temp_min": 26.83,
			"temp_max": 26.83,
			"pressure": 1012,
			"sea_level": 1012,
			"grnd_level": 998,
			"humidity": 68,
			"temp_kf": 0
		},
		"weather": [
			{
				"id": 800,
				"main": "Clear",
				"description": "clear sky",
				"icon": "01d"
			}
		],
		"clouds": {
			"all": 7
		},
		"wind": {
			"speed": 3.49,
			"deg": 127
		},
		"sys": {
			"pod": "d"
		},
		"dt_txt": "2020-06-09 15:00:00"
	},
	{
		"dt": 1591725600,
		"main": {
			"temp": 21.87,
			"feels_like": 22.74,
			"temp_min": 21.87,
			"temp_max": 21.87,
			"pressure": 1012,
			"sea_level": 1012,
			"grnd_level": 997,
			"humidity": 79,
			"temp_kf": 0
		},
		"weather": [
			{
				"id": 802,
				"main": "Clouds",
				"description": "scattered clouds",
				"icon": "03d"
			}
		],
		"clouds": {
			"all": 39
		},
		"wind": {
			"speed": 2.78,
			"deg": 101
		},
		"sys": {
			"pod": "d"
		},
		"dt_txt": "2020-06-09 18:00:00"
	},
	{
		"dt": 1591736400,
		"main": {
			"temp": 20.03,
			"feels_like": 20.16,
			"temp_min": 20.03,
			"temp_max": 20.03,
			"pressure": 1013,
			"sea_level": 1013,
			"grnd_level": 998,
			"humidity": 85,
			"temp_kf": 0
		},
		"weather": [
			{
				"id": 804,
				"main": "Clouds",
				"description": "overcast clouds",
				"icon": "04n"
			}
		],
		"clouds": {
			"all": 88
		},
		"wind": {
			"speed": 3.47,
			"deg": 102
		},
		"sys": {
			"pod": "n"
		},
		"dt_txt": "2020-06-09 21:00:00"
	},
	{
		"dt": 1591747200,
		"main": {
			"temp": 18.36,
			"feels_like": 18.13,
			"temp_min": 18.36,
			"temp_max": 18.36,
			"pressure": 1012,
			"sea_level": 1012,
			"grnd_level": 997,
			"humidity": 87,
			"temp_kf": 0
		},
		"weather": [
			{
				"id": 803,
				"main": "Clouds",
				"description": "broken clouds",
				"icon": "04n"
			}
		],
		"clouds": {
			"all": 63
		},
		"wind": {
			"speed": 3.25,
			"deg": 112
		},
		"sys": {
			"pod": "n"
		},
		"dt_txt": "2020-06-10 00:00:00"
	},
	{
		"dt": 1591758000,
		"main": {
			"temp": 18.13,
			"feels_like": 18.23,
			"temp_min": 18.13,
			"temp_max": 18.13,
			"pressure": 1012,
			"sea_level": 1012,
			"grnd_level": 998,
			"humidity": 87,
			"temp_kf": 0
		},
		"weather": [
			{
				"id": 803,
				"main": "Clouds",
				"description": "broken clouds",
				"icon": "04d"
			}
		],
		"clouds": {
			"all": 73
		},
		"wind": {
			"speed": 2.65,
			"deg": 117
		},
		"sys": {
			"pod": "d"
		},
		"dt_txt": "2020-06-10 03:00:00"
	},
	{
		"dt": 1591768800,
		"main": {
			"temp": 22.61,
			"feels_like": 23.01,
			"temp_min": 22.61,
			"temp_max": 22.61,
			"pressure": 1012,
			"sea_level": 1012,
			"grnd_level": 998,
			"humidity": 75,
			"temp_kf": 0
		},
		"weather": [
			{
				"id": 803,
				"main": "Clouds",
				"description": "broken clouds",
				"icon": "04d"
			}
		],
		"clouds": {
			"all": 71
		},
		"wind": {
			"speed": 3.39,
			"deg": 115
		},
		"sys": {
			"pod": "d"
		},
		"dt_txt": "2020-06-10 06:00:00"
	},
	{
		"dt": 1591779600,
		"main": {
			"temp": 26.45,
			"feels_like": 26.32,
			"temp_min": 26.45,
			"temp_max": 26.45,
			"pressure": 1012,
			"sea_level": 1012,
			"grnd_level": 998,
			"humidity": 62,
			"temp_kf": 0
		},
		"weather": [
			{
				"id": 802,
				"main": "Clouds",
				"description": "scattered clouds",
				"icon": "03d"
			}
		],
		"clouds": {
			"all": 39
		},
		"wind": {
			"speed": 4.53,
			"deg": 113
		},
		"sys": {
			"pod": "d"
		},
		"dt_txt": "2020-06-10 09:00:00"
	},
	{
		"dt": 1591790400,
		"main": {
			"temp": 27.66,
			"feels_like": 27.26,
			"temp_min": 27.66,
			"temp_max": 27.66,
			"pressure": 1011,
			"sea_level": 1011,
			"grnd_level": 997,
			"humidity": 60,
			"temp_kf": 0
		},
		"weather": [
			{
				"id": 801,
				"main": "Clouds",
				"description": "few clouds",
				"icon": "02d"
			}
		],
		"clouds": {
			"all": 20
		},
		"wind": {
			"speed": 5.3,
			"deg": 123
		},
		"sys": {
			"pod": "d"
		},
		"dt_txt": "2020-06-10 12:00:00"
	},
	{
		"dt": 1591801200,
		"main": {
			"temp": 26.96,
			"feels_like": 28.18,
			"temp_min": 26.96,
			"temp_max": 26.96,
			"pressure": 1010,
			"sea_level": 1010,
			"grnd_level": 996,
			"humidity": 69,
			"temp_kf": 0
		},
		"weather": [
			{
				"id": 800,
				"main": "Clear",
				"description": "clear sky",
				"icon": "01d"
			}
		],
		"clouds": {
			"all": 0
		},
		"wind": {
			"speed": 4.07,
			"deg": 127
		},
		"sys": {
			"pod": "d"
		},
		"dt_txt": "2020-06-10 15:00:00"
	},
	{
		"dt": 1591812000,
		"main": {
			"temp": 22.51,
			"feels_like": 24.05,
			"temp_min": 22.51,
			"temp_max": 22.51,
			"pressure": 1010,
			"sea_level": 1010,
			"grnd_level": 996,
			"humidity": 84,
			"temp_kf": 0
		},
		"weather": [
			{
				"id": 800,
				"main": "Clear",
				"description": "clear sky",
				"icon": "01d"
			}
		],
		"clouds": {
			"all": 2
		},
		"wind": {
			"speed": 2.85,
			"deg": 97
		},
		"sys": {
			"pod": "d"
		},
		"dt_txt": "2020-06-10 18:00:00"
	},
	{
		"dt": 1591822800,
		"main": {
			"temp": 20.52,
			"feels_like": 21.19,
			"temp_min": 20.52,
			"temp_max": 20.52,
			"pressure": 1011,
			"sea_level": 1011,
			"grnd_level": 997,
			"humidity": 86,
			"temp_kf": 0
		},
		"weather": [
			{
				"id": 802,
				"main": "Clouds",
				"description": "scattered clouds",
				"icon": "03n"
			}
		],
		"clouds": {
			"all": 40
		},
		"wind": {
			"speed": 3.09,
			"deg": 105
		},
		"sys": {
			"pod": "n"
		},
		"dt_txt": "2020-06-10 21:00:00"
	},
	{
		"dt": 1591833600,
		"main": {
			"temp": 18.95,
			"feels_like": 19,
			"temp_min": 18.95,
			"temp_max": 18.95,
			"pressure": 1010,
			"sea_level": 1010,
			"grnd_level": 996,
			"humidity": 89,
			"temp_kf": 0
		},
		"weather": [
			{
				"id": 801,
				"main": "Clouds",
				"description": "few clouds",
				"icon": "02n"
			}
		],
		"clouds": {
			"all": 21
		},
		"wind": {
			"speed": 3.38,
			"deg": 98
		},
		"sys": {
			"pod": "n"
		},
		"dt_txt": "2020-06-11 00:00:00"
	},
	{
		"dt": 1591844400,
		"main": {
			"temp": 18.86,
			"feels_like": 19.21,
			"temp_min": 18.86,
			"temp_max": 18.86,
			"pressure": 1010,
			"sea_level": 1010,
			"grnd_level": 996,
			"humidity": 90,
			"temp_kf": 0
		},
		"weather": [
			{
				"id": 801,
				"main": "Clouds",
				"description": "few clouds",
				"icon": "02d"
			}
		],
		"clouds": {
			"all": 14
		},
		"wind": {
			"speed": 3,
			"deg": 120
		},
		"sys": {
			"pod": "d"
		},
		"dt_txt": "2020-06-11 03:00:00"
	},
	{
		"dt": 1591855200,
		"main": {
			"temp": 23.74,
			"feels_like": 24.29,
			"temp_min": 23.74,
			"temp_max": 23.74,
			"pressure": 1011,
			"sea_level": 1011,
			"grnd_level": 996,
			"humidity": 72,
			"temp_kf": 0
		},
		"weather": [
			{
				"id": 801,
				"main": "Clouds",
				"description": "few clouds",
				"icon": "02d"
			}
		],
		"clouds": {
			"all": 11
		},
		"wind": {
			"speed": 3.44,
			"deg": 122
		},
		"sys": {
			"pod": "d"
		},
		"dt_txt": "2020-06-11 06:00:00"
	},
	{
		"dt": 1591866000,
		"main": {
			"temp": 27.46,
			"feels_like": 27.41,
			"temp_min": 27.46,
			"temp_max": 27.46,
			"pressure": 1010,
			"sea_level": 1010,
			"grnd_level": 996,
			"humidity": 60,
			"temp_kf": 0
		},
		"weather": [
			{
				"id": 500,
				"main": "Rain",
				"description": "light rain",
				"icon": "10d"
			}
		],
		"clouds": {
			"all": 0
		},
		"wind": {
			"speed": 4.68,
			"deg": 118
		},
		"rain": {
			"3h": 0.17
		},
		"sys": {
			"pod": "d"
		},
		"dt_txt": "2020-06-11 09:00:00"
	},
	{
		"dt": 1591876800,
		"main": {
			"temp": 28.8,
			"feels_like": 28.57,
			"temp_min": 28.8,
			"temp_max": 28.8,
			"pressure": 1009,
			"sea_level": 1009,
			"grnd_level": 995,
			"humidity": 54,
			"temp_kf": 0
		},
		"weather": [
			{
				"id": 800,
				"main": "Clear",
				"description": "clear sky",
				"icon": "01d"
			}
		],
		"clouds": {
			"all": 4
		},
		"wind": {
			"speed": 4.66,
			"deg": 124
		},
		"sys": {
			"pod": "d"
		},
		"dt_txt": "2020-06-11 12:00:00"
	},
	{
		"dt": 1591887600,
		"main": {
			"temp": 27.94,
			"feels_like": 29.71,
			"temp_min": 27.94,
			"temp_max": 27.94,
			"pressure": 1009,
			"sea_level": 1009,
			"grnd_level": 994,
			"humidity": 66,
			"temp_kf": 0
		},
		"weather": [
			{
				"id": 800,
				"main": "Clear",
				"description": "clear sky",
				"icon": "01d"
			}
		],
		"clouds": {
			"all": 3
		},
		"wind": {
			"speed": 3.44,
			"deg": 103
		},
		"sys": {
			"pod": "d"
		},
		"dt_txt": "2020-06-11 15:00:00"
	},
	{
		"dt": 1591898400,
		"main": {
			"temp": 22.94,
			"feels_like": 24.15,
			"temp_min": 22.94,
			"temp_max": 22.94,
			"pressure": 1009,
			"sea_level": 1009,
			"grnd_level": 995,
			"humidity": 81,
			"temp_kf": 0
		},
		"weather": [
			{
				"id": 800,
				"main": "Clear",
				"description": "clear sky",
				"icon": "01d"
			}
		],
		"clouds": {
			"all": 7
		},
		"wind": {
			"speed": 3.22,
			"deg": 90
		},
		"sys": {
			"pod": "d"
		},
		"dt_txt": "2020-06-11 18:00:00"
	}
];

