'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, Package, DollarSign, ShoppingCart } from 'lucide-react'

interface Stats {
  totalSales: number
  totalPurchases: number
  totalProducts: number
  todayRevenue: number
  monthlyGrowth: number
  recentTransactions: Array<{
    id: string
    type: 'sale' | 'purchase'
    description: string
    amount: number
    date: string
  }>
}

export default function ERPStats() {
  const [stats, setStats] = useState<Stats>({
    totalSales: 0,
    totalPurchases: 0,
    totalProducts: 0,
    todayRevenue: 0,
    monthlyGrowth: 0,
    recentTransactions: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 실제로는 API에서 데이터 가져오기
    const mockStats: Stats = {
      totalSales: 125,
      totalPurchases: 48,
      totalProducts: 15,
      todayRevenue: 2500000,
      monthlyGrowth: 12.5,
      recentTransactions: [
        {
          id: '1',
          type: 'sale',
          description: '김치찌개 500개 → 강원삼푸터',
          amount: 2500000,
          date: new Date().toISOString()
        },
        {
          id: '2',
          type: 'purchase',
          description: '돼지고기 100kg ← 서울육류',
          amount: 850000,
          date: new Date(Date.now() - 3600000).toISOString()
        },
        {
          id: '3',
          type: 'sale',
          description: '된장찌개 300개 → 제주식당',
          amount: 1200000,
          date: new Date(Date.now() - 7200000).toISOString()
        }
      ]
    }

    setTimeout(() => {
      setStats(mockStats)
      setLoading(false)
    }, 1000)
  }, [])

  const statCards = [
    {
      title: '총 판매량',
      value: stats.totalSales,
      icon: ShoppingCart,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: '총 구매량',
      value: stats.totalPurchases,
      icon: Package,
      color: 'bg-green-500',
      change: '+8%'
    },
    {
      title: '오늘 매출',
      value: `${stats.todayRevenue.toLocaleString()}원`,
      icon: DollarSign,
      color: 'bg-purple-500',
      change: '+15%'
    },
    {
      title: '월 성장률',
      value: `${stats.monthlyGrowth}%`,
      icon: TrendingUp,
      color: 'bg-orange-500',
      change: '+2.5%'
    }
  ]

  if (loading) {
    return (
      <div className="space-4">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow p-6">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg text-white`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-sm text-green-600 font-medium">
                {stat.change}
              </span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">
              {stat.title}
            </h3>
            <p className="text-2xl font-bold text-gray-900">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            최근 거래 내역
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  구분
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  내용
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  금액
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  시간
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stats.recentTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        transaction.type === 'sale'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {transaction.type === 'sale' ? '판매' : '구매'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {transaction.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.amount.toLocaleString()}원
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(transaction.date).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}