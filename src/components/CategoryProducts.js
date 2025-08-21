import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import ProductCard from './ProductCard'; // استيراد بطاقة المنتج التي أنشأناها
import { ThemeContext } from '../contexts/ThemeContext';
import ViewAllIcon from '../images/icons/veiwAll.svg';
import { Link } from 'react-router-dom';

// بيانات مؤقتة للتجربة فقط، سنستبدلها لاحقاً ببيانات حقيقية من الـ API
const mockProducts = [
  { id: 1, name: 'Light Shade Oak', description: 'High-quality oak flooring.', price: 55.99, imageUrl: 'https://via.placeholder.com/300' },
  { id: 2, name: 'Dark Shade Oak', description: 'Elegant dark oak flooring.', price: 62.50, imageUrl: 'https://via.placeholder.com/300' },
  { id: 3, name: 'Modern Grey Tile', description: 'Sleek and modern tiling.', price: 48.00, imageUrl: 'https://via.placeholder.com/300' },
  { id: 4, name: 'Classic Parquet', description: 'Timeless parquet design.', price: 75.25, imageUrl: 'https://via.placeholder.com/300' },
];

const CategoryProducts = ({ title, categoryId }) => {
  const { t } = useTranslation();
  const { darkMode } = useContext(ThemeContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //
    // *** ملاحظة هامة ***
    // هنا في المستقبل، سنقوم باستدعاء الـ API لجلب المنتجات الحقيقية
    // const fetchedProducts = await apiService.getProductsByCategory(categoryId);
    // setProducts(fetchedProducts);
    //
    // حالياً، سنستخدم البيانات المؤقتة لمحاكاة العملية
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000); // محاكاة تأخير الشبكة لمدة ثانية واحدة
  }, [categoryId]);

  return (
    <div className={`p-4 rounded-lg shadow-md mb-8 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-700'}`}>{title}</h2>
        <Link to={`/category/${categoryId}`} className="flex items-center bg-teal-900 text-white py-1 px-3 rounded-lg hover:bg-teal-950 transition">
          {t('view_all')}
          <img src={ViewAllIcon} alt="View All Icon" className="w-4 h-4 ml-2" />
        </Link>
      </div>
      
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;