import React, { useEffect, useState } from "react";
import { fetchStores } from "@/api/store";
import { fetchCreateReview } from "@/api/review";
import Layout from "@/components/Layout";

function ReviewCreate() {
  const [stores, setStores] = useState([]);
  const [store, setStore] = useState("");
  const [rating, setRating] = useState(1);
  const [reviewer, setReviewer] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadStores = async () => {
      const token = localStorage.getItem("token");
      const data = await fetchStores(token);
      setStores(data || []);
      if (data && data.length > 0) setStore(data[0].name);
    };
    loadStores();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!store || !reviewer || !content) {
      alert("모든 필드를 입력해주세요.");
      return;
    }
    setLoading(true);
    const token = localStorage.getItem("token");
    const { ok, data } = await fetchCreateReview(token, reviewer, rating, store, content);
    setLoading(false);
    if (ok) {
      alert("리뷰가 등록되었습니다.");
      setReviewer("");
      setContent("");
      setRating(1);
      setStore(stores[0]?.name || "");
    } else {
      alert(data.detail || "리뷰 등록에 실패했습니다.");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-[#F6F8FB] flex justify-center items-center">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-8 w-full max-w-md space-y-6">
          <h1 className="text-2xl font-bold mb-4">리뷰 등록</h1>
          <div>
            <label className="block mb-1 font-medium">스토어</label>
            <select
              className="w-full border border-[#E5E7EB] rounded-lg px-4 py-2"
              value={store}
              onChange={e => setStore(e.target.value)}
              required
            >
              {stores.map((s) => (
                <option key={s.id || s.name} value={s.name}>{s.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">별점</label>
            <select
              className="w-full border border-[#E5E7EB] rounded-lg px-4 py-2"
              value={rating}
              onChange={e => setRating(Number(e.target.value))}
              required
            >
              {[1,2,3,4,5].map(num => (
                <option key={num} value={num}>{num}점</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">리뷰어</label>
            <input
              className="w-full border border-[#E5E7EB] rounded-lg px-4 py-2"
              value={reviewer}
              onChange={e => setReviewer(e.target.value)}
              required
              placeholder="리뷰어 이름"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">리뷰 내용</label>
            <textarea
              className="w-full border border-[#E5E7EB] rounded-lg px-4 py-2"
              value={content}
              onChange={e => setContent(e.target.value)}
              required
              placeholder="리뷰 내용을 입력하세요"
              rows={5}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "등록 중..." : "리뷰 등록"}
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default ReviewCreate; 