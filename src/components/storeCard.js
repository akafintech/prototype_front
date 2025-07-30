import { FaHotel } from "react-icons/fa";

export default function StoreCard({ store, onDelete }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 flex items-center gap-4">
      <FaHotel className="text-2xl text-blue-400" />
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{store.name}</h3>
        <p className="text-gray-600">사업자 등록번호: {store.business_number}</p>
        <button
          onClick={() => onDelete(store.id)}
          className="mt-2 text-red-500 hover:text-red-700"
        >
          삭제
        </button>
      </div>
    </div>
  );
}