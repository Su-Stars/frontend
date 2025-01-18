'use client'

import { sendGAEvent } from '@next/third-parties/google'

// Google Analytics의 sendGAEvent 함수를 호출하는 얘시를 보여주기 위한 예시 컴포넌트입니다.
export default function GAEventButton() {
  return (
    <div>
      <button
        // 버튼 클릭 시 sendGAEvent 함수 호출
        // sendGAEvent 함수는 Google Analytics로 이벤트를 전송합니다.
        // 첫 번째 인자는 이벤트의 유형 (예: 'event')
        // 두 번째 인자는 이벤트의 이름 (예: 'buttonClicked')
        // 세 번째 인자는 이벤트와 관련된 추가 데이터 (예: { value: 'xyz' })

        // 수신된 이벤트는 Google Analytics에서 확인할 수 있습니다.
        onClick={() => sendGAEvent('event', 'buttonClicked', { value: 'xyz' })}
      >
        Send Event
      </button>
    </div>
  )
}
