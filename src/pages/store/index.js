import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";

export default function StoreManagePage() {
  const { currentUser } = useAuth();
  const router = useRouter();
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);

  // 모달 관련 상태
  const [showModal, setShowModal] = useState(false);
  const [modalStoreName, setModalStoreName] = useState("");
  const [modalBusinessNumber, setModalBusinessNumber] = useState("");

  useEffect(() => {
    if (!currentUser) {
      router.push("/");
      return;
    }
    loadStores();
    // eslint-disable-next-line
  }, [currentUser]);

  const loadStores = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const data = await fetchStores(token);
    setStores(data.stores || []);
    setLoading(false);
  };

  const handleOpenModal = () => {
    setModalStoreName("");
    setModalBusinessNumber("");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalStoreName("");
    setModalBusinessNumber("");
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    if (!modalStoreName.trim() || !modalBusinessNumber.trim()) return;
    setLoading(true);
    const token = localStorage.getItem("token");
    await addStore(token, modalStoreName, modalBusinessNumber);
    setShowModal(false);
    setModalStoreName("");
    setModalBusinessNumber("");
    await loadStores();
  };

  const handleDeleteStore = async (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    setLoading(true);
    const token = localStorage.getItem("token");
    await deleteStore(token, id);
    await loadStores();
  };

  if (!currentUser) return null;

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">매장 관리</h1>
      <button
        className="mb-6 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleOpenModal}
      >
        매장 등록
      </button>

      {/* 매장 등록 모달 */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm">
            <h2 className="text-xl font-semibold mb-4">매장 등록</h2>
            <form onSubmit={handleModalSubmit} className="space-y-4">
              <div>
                <label className="block text-sm mb-1">매장 이름</label>
                <input
                  type="text"
                  value={modalStoreName}
                  onChange={e => setModalStoreName(e.target.value)}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">사업자 번호</label>
                <input
                  type="text"
                  value={modalBusinessNumber}
                  onChange={e => setModalBusinessNumber(e.target.value)}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-gray-200"
                  onClick={handleCloseModal}
                  disabled={loading}
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-500 text-white"
                  disabled={loading}
                >
                  등록
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {loading ? (
        <div>로딩 중...</div>
      ) : (
        <ul className="space-y-2">
          {stores.length === 0 && <li>등록된 매장이 없습니다.</li>}
          {stores.map(store => (
            <li
              key={store.id}
              className="flex justify-between items-center border px-4 py-2 rounded"
            >
              <span>
                {store.name}
                {store.businessNumber && (
                  <span className="ml-2 text-xs text-gray-500">
                    ({store.businessNumber})
                  </span>
                )}
              </span>
              <button
                onClick={() => handleDeleteStore(store.id)}
                className="text-red-500 hover:underline"
                disabled={loading}
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}