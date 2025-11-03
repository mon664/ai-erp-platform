import { NextRequest, NextResponse } from 'next/server'

// AI 분석 함수 (GLM 4.6)
async function analyzeWithGLM(message: string) {
  // GLM API 호출 로직 (실제로는 API 키 필요)
  const normalizedMessage = message.toLowerCase()

  // 간단한 규칙 기반 분석 (실제로는 AI 모델 사용)
  if (normalizedMessage.includes('판매') || normalizedMessage.includes('매출')) {
    const saleMatch = message.match(/(\w+)\s*(\d+)개?\s*(\w+)/)
    if (saleMatch) {
      return {
        action: 'sale',
        data: {
          product: saleMatch[1],
          quantity: parseInt(saleMatch[2]),
          customer: saleMatch[3],
          price: Math.floor(Math.random() * 10000) + 5000,
          date: new Date().toISOString().split('T')[0]
        }
      }
    }
  }

  if (normalizedMessage.includes('구매')) {
    const purchaseMatch = message.match(/(\w+)\s*(\d+)kg?\s*(\w+)/)
    if (purchaseMatch) {
      return {
        action: 'purchase',
        data: {
          product: purchaseMatch[1],
          quantity: parseInt(purchaseMatch[2]),
          vendor: purchaseMatch[3],
          price: Math.floor(Math.random() * 50000) + 10000,
          date: new Date().toISOString().split('T')[0]
        }
      }
    }
  }

  if (normalizedMessage.includes('매출') || normalizedMessage.includes('통계')) {
    return {
      action: 'stats',
      data: {
        todaySales: Math.floor(Math.random() * 10000000) + 1000000,
        monthGrowth: (Math.random() * 20 + 5).toFixed(1)
      }
    }
  }

  return {
    action: 'unknown',
    data: { message: '이해하지 못했습니다. 다시 입력해주세요.' }
  }
}

// Dolibarr 판매 등록
async function saveDolSale(data: any) {
  // 실제 Dolibarr API 연동 로직
  const payload = {
    ref: `SALE-${Date.now()}`,
    date: Math.floor(new Date(data.date).getTime() / 1000),
    array_lines: [{
      description: data.product,
      qty: data.quantity,
      subprice: data.price,
      total_ht: data.quantity * data.price,
      total_ttc: data.quantity * data.price * 1.1
    }]
  }

  // 시뮬레이션된 응답
  return {
    success: true,
    id: Math.floor(Math.random() * 1000),
    message: '판매 데이터가 성공적으로 등록되었습니다.',
    data: payload
  }
}

// Dolibarr 구매 등록
async function saveDolPurchase(data: any) {
  // 실제 Dolibarr API 연동 로직
  const payload = {
    ref: `PUR-${Date.now()}`,
    date: Math.floor(new Date(data.date).getTime() / 1000),
    array_lines: [{
      description: data.product,
      qty: data.quantity,
      subprice: data.price,
      total_ht: data.quantity * data.price,
      total_ttc: data.quantity * data.price * 1.1
    }]
  }

  // 시뮬레이션된 응답
  return {
    success: true,
    id: Math.floor(Math.random() * 1000),
    message: '구매 데이터가 성공적으로 등록되었습니다.',
    data: payload
  }
}

export async function POST(request: NextRequest) {
  try {
    const { message, confirmed } = await request.json()

    if (!message) {
      return NextResponse.json(
        { error: '메시지가 필요합니다.' },
        { status: 400 }
      )
    }

    // AI 분석
    const aiResult = await analyzeWithGLM(message)

    // Dolibarr에 직접 저장
    let result
    switch (aiResult.action) {
      case 'sale':
        result = await saveDolSale(aiResult.data)
        return NextResponse.json({
          success: true,
          message: `✅ 판매 등록 완료!\n${aiResult.data.product} ${aiResult.data.quantity}개 → ${aiResult.data.customer}\n금액: ${aiResult.data.price.toLocaleString()}원`,
          data: result
        })

      case 'purchase':
        result = await saveDolPurchase(aiResult.data)
        return NextResponse.json({
          success: true,
          message: `✅ 구매 등록 완료!\n${aiResult.data.product} ${aiResult.data.quantity}kg ← ${aiResult.data.vendor}\n금액: ${aiResult.data.price.toLocaleString()}원`,
          data: result
        })

      case 'stats':
        return NextResponse.json({
          success: true,
          message: `📊 오늘 통계\n오늘 매출: ${aiResult.data.todaySales.toLocaleString()}원\n월 성장률: ${aiResult.data.monthGrowth}%`,
          data: aiResult.data
        })

      default:
        return NextResponse.json({
          success: false,
          message: '이해하지 못했습니다. 아래 예시를 참고해주세요:\n• "판매: 김치찌개 500개 강원삼푸터에"\n• "구매: 돼지고기 100kg 서울육류에서"\n• "오늘 매출 알려줘"'
        })
    }
  } catch (error) {
    console.error('Chat API Error:', error)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}