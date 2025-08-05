import React, { useState, useEffect } from "react";
import tw from "tailwind-styled-components";
import Layout from "@/components/Layout";
import { createAutoReview } from "@/api/autoreview";
import { fetchStores } from "@/api/store";

const Container = tw.div`max-w-4xl mx-auto p-6`;
const Title = tw.h1`text-3xl font-bold text-gray-800 mb-8`;
const FormSection = tw.div`bg-white rounded-lg shadow-md p-6 mb-6`;
const FormTitle = tw.h2`text-xl font-semibold text-gray-700 mb-4`;
const FormGroup = tw.div`mb-4`;
const Label = tw.label`block text-sm font-medium text-gray-700 mb-2`;
const Input = tw.input`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`;
const TextArea = tw.textarea`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none`;
const Select = tw.select`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`;
const Button = tw.button`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed`;
const LoadingSpinner = tw.div`flex justify-center items-center py-4`;
const ResultsSection = tw.div`bg-white rounded-lg shadow-md p-6`;
const ResultCard = tw.div`border border-gray-200 rounded-lg p-4 mb-4`;
const ResultTitle = tw.h3`text-lg font-semibold text-gray-800 mb-2`;
const ResultText = tw.p`text-gray-700 whitespace-pre-wrap`;
const CopyButton = tw.button`mt-2 px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200`;

function AutoReviewIndex() {
  const [formData, setFormData] = useState({
    username: "",
    rating: 5,
    storename: "",
    content: ""
  });
  const [stores, setStores] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadStores();
  }, []);

  const loadStores = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await fetchStores(token);
      setStores(data || []);
    } catch (error) {
      console.error("스토어 로드 중 오류:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setResults(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("로그인이 필요합니다.");
        return;
      }

      const { ok, data } = await createAutoReview(token, formData);
      
      if (!ok) {
        setError(data.detail || "자동 리뷰 생성 중 오류가 발생했습니다.");
        return;
      }

      setResults(data);
    } catch (error) {
      console.error("자동 리뷰 생성 오류:", error);
      setError("자동 리뷰 생성 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("클립보드에 복사되었습니다.");
    }).catch(() => {
      alert("복사에 실패했습니다.");
    });
  };

  return (
    <Layout>
      <Container>
        <Title>자동 리뷰 생성</Title>
        
        <FormSection>
          <FormTitle>리뷰 정보 입력</FormTitle>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>사용자명</Label>
              <Input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="사용자명을 입력하세요"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>별점</Label>
              <Select
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
                required
              >
                <option value={5}>5점</option>
                <option value={4}>4점</option>
                <option value={3}>3점</option>
                <option value={2}>2점</option>
                <option value={1}>1점</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>매장명</Label>
              <Select
                name="storename"
                value={formData.storename}
                onChange={handleInputChange}
                required
              >
                <option value="">매장을 선택하세요</option>
                {stores.map((store, index) => (
                  <option key={index} value={store}>
                    {store}
                  </option>
                ))}
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>리뷰 내용</Label>
              <TextArea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="리뷰 내용을 입력하세요"
                required
              />
            </FormGroup>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "생성 중..." : "자동 리뷰 생성"}
            </Button>
          </form>
        </FormSection>

        {isLoading && (
          <LoadingSpinner>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </LoadingSpinner>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {results && (
          <ResultsSection>
            <FormTitle>생성된 리뷰</FormTitle>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">한국어 버전</h3>
              {results.results?.map((result) => (
                <ResultCard key={result.id}>
                  <ResultTitle>{result.title}</ResultTitle>
                  <ResultText>{result.text}</ResultText>
                  <CopyButton onClick={() => copyToClipboard(result.text)}>
                    복사
                  </CopyButton>
                </ResultCard>
              ))}
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">영어 버전</h3>
              {results.results_en?.map((result) => (
                <ResultCard key={result.id}>
                  <ResultTitle>{result.title}</ResultTitle>
                  <ResultText>{result.text}</ResultText>
                  <CopyButton onClick={() => copyToClipboard(result.text)}>
                    복사
                  </CopyButton>
                </ResultCard>
              ))}
            </div>
          </ResultsSection>
        )}
      </Container>
    </Layout>
  );
}

export default AutoReviewIndex; 