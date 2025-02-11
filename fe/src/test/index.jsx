import React, { useState } from 'react';

const Test = () => {
  const [color, setColor] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [sku, setSku] = useState('');
  const [variations, setVariations] = useState([{ color: '', price: '', stock: '', sku: '', options: [] }]);

  const handleAddVariation = () => {
    setVariations([
      ...variations,
      { color: '', price: '', stock: '', sku: '', options: [] },
    ]);
  };

  const handleVariationChange = (index, field, value) => {
    const updatedVariations = [...variations];
    updatedVariations[index][field] = value;
    setVariations(updatedVariations);
  };

  const handleAddOption = (index) => {
    const updatedVariations = [...variations];
    updatedVariations[index].options = [...updatedVariations[index].options, ''];
    setVariations(updatedVariations);
  };

  const handleOptionChange = (variationIndex, optionIndex, value) => {
    const updatedVariations = [...variations];
    updatedVariations[variationIndex].options[optionIndex] = value;
    setVariations(updatedVariations);
  };

  return (
    <div className="product-classification p-4 border rounded-md shadow-sm">
      <div className="header flex items-center justify-between mb-2">
        <div className="title font-semibold">* Phân loại hàng</div>
        <div className="subtitle text-sm mr-2">Phân loại 1</div>
        <div className="flex items-center">
          <label htmlFor="color" className="mr-1">Màu sắc:</label>
          <input
            type="text"
            id="color"
            className="border rounded-sm px-2 py-1 text-sm mr-1"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <span className="text-xs text-gray-500">7/14</span>
        </div>
        <button className="close text-gray-500 hover:text-gray-700">&times;</button>
      </div>

      <div className="options flex items-center mb-2 text-sm">
        Tùy chọn:&nbsp;
        <input type="text" placeholder="Type or Select" className="border rounded-sm px-2 py-1 mr-1 w-24" />
        <span className="text-xs text-gray-500 mr-1">0/20</span>
        <input type="text" placeholder="Type or Select" className="border rounded-sm px-2 py-1 mr-1 w-24" />
        <span className="text-xs text-gray-500 mr-1">0/20</span>
        <span className="text-xs text-red-500">Không được để trống ô</span>
      </div>

      <button
        className="add-variation bg-gray-100 hover:bg-gray-200 text-gray-700 py-1 px-2 rounded-sm mb-2 text-sm"
        onClick={handleAddVariation}
      >
        + Thêm nhóm phân loại 2
      </button>

      <div className="variation-list border rounded-md">
        <div className="variation-header flex items-center bg-gray-100 py-2 px-4 text-sm font-semibold">
          <span className="w-24">Danh sách phân loại hàng</span>
          <span className="w-24">Giá</span>
          <span className="w-24">Kho hàng</span>
          <span className="w-24">SKU phân loại</span>
          <button className="apply-all bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded-sm text-xs">
            Áp dụng cho tất cả phân loại
          </button>
        </div>

        {variations.map((variation, index) => (
          <div className="variation-item flex items-center py-2 px-4 border-t text-sm" key={index}>
            <div className="options-group flex items-center">
              {variation.options.map((option, optionIndex) => (
                <input
                  key={optionIndex}
                  type="text"
                  placeholder="Tùy chọn"
                  className="border rounded-sm px-2 py-1 w-24 mr-2"
                  value={option}
                  onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                />
              ))}
              <button
                className="add-option bg-gray-100 hover:bg-gray-200 text-gray-700 py-1 px-2 rounded-sm text-xs"
                onClick={() => handleAddOption(index)}
              >
                + Thêm tùy chọn
              </button>
            </div>
            <input
              type="text"
              placeholder="Giá"
              className="border rounded-sm px-2 py-1 w-24 mr-2"
              value={variation.price}
              onChange={(e) => handleVariationChange(index, 'price', e.target.value)}
            />
            <input
              type="text"
              placeholder="Kho hàng"
              className="border rounded-sm px-2 py-1 w-24 mr-2"
              value={variation.stock}
              onChange={(e) => handleVariationChange(index, 'stock', e.target.value)}
            />
            <input
              type="text"
              placeholder="SKU phân loại"
              className="border rounded-sm px-2 py-1 w-24"
              value={variation.sku}
              onChange={(e) => handleVariationChange(index, 'sku', e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Test;

