'use client'

import { useState } from 'react'
import ChatInterface from '@/components/ChatInterface'
import ERPStats from '@/components/ERPStats'

export default function Home() {
  const [activeTab, setActiveTab] = useState<'chat' | 'stats'>('chat')

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            AI ERP Platform
          </h1>
          <p className="text-gray-600">
            자동화된 ERP 데이터 관리 및 AI 챗봇 시스템
          </p>
        </header>

        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('chat')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'chat'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                AI 챗봇
              </button>
              <button
                onClick={() => setActiveTab('stats')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'stats'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                통계 보기
              </button>
            </nav>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {activeTab === 'chat' ? <ChatInterface /> : <ERPStats />}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                빠른 명령어
              </h3>
              <div className="space-y-2 text-sm">
                <div className="p-3 bg-gray-50 rounded">
                  <code className="text-blue-600">"판매: 김치찌개 500개 강원삼푸터에"</code>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <code className="text-blue-600">"구매: 돼지고기 100kg 서울육류에서"</code>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <code className="text-blue-600">"오늘 매출 알려줘"</code>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                시스템 상태
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">데이터베이스</span>
                  <span className="text-sm text-green-600">연결됨</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">AI 모델</span>
                  <span className="text-sm text-green-600">GLM-4.6</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">ERP 연동</span>
                  <span className="text-sm text-green-600">Dolibarr</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}