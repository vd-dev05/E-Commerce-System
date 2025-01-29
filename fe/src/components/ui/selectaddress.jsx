import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddressSelector = ({ cities, setCities, districts, setDistricts, wards, setWards, selectedCity, setSelectedCity, selectedDistrict, setSelectedDistrict, dataAddress, setDataAddress }) => {

  useEffect(() => {
    // Fetch city data on component mount
    axios.get("https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json")
      .then(response => {
        setCities(response.data);
      })
      .catch(error => {
        console.error("Error fetching city data:", error);
      });
  }, []);

  const handleCityChange = (event) => {
    const cityId = event.target.value;
    setSelectedCity(cityId);
    setSelectedDistrict('');  // Reset district when city changes
    setWards([]);  // Reset wards when city changes

    // Find districts for the selected city
    if (cityId) {
      const city = cities.find(city => city.Id === cityId);
      setDistricts(city ? city.Districts : []);
    } else {
      setDistricts([]);
    }
    setDataAddress(prev => ({ ...prev, cityId }));
  };

  const handleDistrictChange = (event) => {
    const districtId = event.target.value;
    setSelectedDistrict(districtId);
    setWards([]);  // Reset wards when district changes

    // Find wards for the selected district
    if (districtId) {
      const city = cities.find(city => city.Id === selectedCity);
      const district = city ? city.Districts.find(d => d.Id === districtId) : null;
      setWards(district ? district.Wards : []);
    }
    setDataAddress(prev => ({ ...prev, districtId }));
  };

  const handleWardChange = (event) => {
    const wardId = event.target.value;
    setDataAddress(prev => ({ ...prev, wardId }));
  };

  return (
    <div className="flex flex-col gap-2">
      <select
        className="form-select form-select-sm"
        id="city"
        aria-label=".form-select-sm"
        value={selectedCity}
        onChange={handleCityChange}
      >
        <option value="">Chọn tỉnh thành</option>
        {cities.map(city => (
          <option key={city.Id} value={city.Id}>
            {city.Name}
          </option>
        ))}
      </select>

      <select
        className="form-select form-select-sm"
        id="district"
        aria-label=".form-select-sm"
        value={selectedDistrict}
        onChange={handleDistrictChange}
      >
        <option value="">Chọn quận huyện</option>
        {districts.map(district => (
          <option key={district.Id} value={district.Id}>
            {district.Name}
          </option>
        ))}
      </select>

      <select
        className="form-select form-select-sm"
        id="ward"
        aria-label=".form-select-sm"
        disabled={wards.length === 0}
        onChange={handleWardChange}
      >
        <option value="">Chọn phường xã</option>
        {wards.map(ward => (
          <option key={ward.Id} value={ward.Id}>
            {ward.Name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AddressSelector;

