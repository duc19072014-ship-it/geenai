import { SampleWasteItem } from '../types/waste';

function createSvgDataUri(svgContent: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgContent)}`;
}

export const SAMPLE_WASTE_ITEMS: SampleWasteItem[] = [
  // Test Case 4: A pile containing fruit peels, plastic bottles, paper, and cans
  {
    id: 'test-case-pile-mixed',
    name: 'Đống rác hỗn hợp (Vỏ chuối, chai nhựa, giấy, lon nhôm)',
    category: 'unknown',
    description: 'Chứa 4 món rác khác nhau cùng lúc: vỏ chuối, chai nhựa PET, giấy báo và lon nhôm.',
    testCaseType: 'Đa vật thể hỗn hợp',
    imageUrl: createSvgDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
        <rect width="800" height="600" fill="#F8FAFC"/>
        <rect x="25" y="25" width="750" height="550" rx="24" fill="#F1F5F9" stroke="#94A3B8" stroke-width="2"/>
        
        <!-- Object 1: Plastic Bottle (Top Left) -->
        <g transform="translate(100, 70)">
          <rect x="55" y="20" width="30" height="18" rx="4" fill="#0284C7"/>
          <rect x="62" y="38" width="16" height="15" fill="#38BDF8"/>
          <path d="M 62 53 C 45 75 40 95 40 120 L 40 220 C 40 235 50 245 60 245 L 80 245 C 90 245 100 235 100 220 L 100 120 C 100 95 95 75 78 53 Z" fill="#7DD3FC" opacity="0.85" stroke="#0284C7" stroke-width="2.5"/>
          <circle cx="70" cy="150" r="16" fill="#FFFFFF" opacity="0.9"/>
          <text x="70" y="155" font-family="Arial" font-size="11" font-weight="bold" fill="#0284C7" text-anchor="middle">PET 1</text>
        </g>

        <!-- Object 2: Banana Peel (Top Right) -->
        <g transform="translate(480, 80)">
          <path d="M 90 40 C 60 70 30 110 20 160 C 15 190 35 200 60 170 C 80 140 90 90 90 70 Z" fill="#FACC15" stroke="#CA8A04" stroke-width="2.5"/>
          <path d="M 90 40 C 110 70 150 110 170 160 C 180 185 160 200 135 170 C 115 140 100 90 90 70 Z" fill="#FDE047" stroke="#CA8A04" stroke-width="2.5"/>
          <rect x="85" y="30" width="10" height="15" rx="2" fill="#78350F"/>
          <circle cx="55" cy="130" r="4" fill="#78350F"/>
          <circle cx="130" cy="130" r="4" fill="#78350F"/>
        </g>

        <!-- Object 3: Clean Paper / Newspaper (Bottom Left) -->
        <g transform="translate(100, 340)">
          <rect x="20" y="20" width="180" height="140" rx="4" fill="#FFFFFF" stroke="#94A3B8" stroke-width="2"/>
          <rect x="35" y="35" width="150" height="20" fill="#E2E8F0"/>
          <line x1="35" y1="70" x2="185" y2="70" stroke="#94A3B8" stroke-width="3"/>
          <line x1="35" y1="85" x2="185" y2="85" stroke="#94A3B8" stroke-width="3"/>
          <line x1="35" y1="100" x2="185" y2="100" stroke="#94A3B8" stroke-width="3"/>
          <line x1="35" y1="115" x2="140" y2="115" stroke="#94A3B8" stroke-width="3"/>
        </g>

        <!-- Object 4: Aluminum Can (Bottom Right) -->
        <g transform="translate(500, 330)">
          <ellipse cx="60" cy="40" rx="35" ry="10" fill="#E2E8F0" stroke="#64748B" stroke-width="1.5"/>
          <path d="M 25 40 L 25 160 C 25 175 45 185 60 185 C 75 185 95 175 95 160 L 95 40 Z" fill="#DC2626" stroke="#991B1B" stroke-width="2"/>
          <ellipse cx="60" cy="40" rx="20" ry="6" fill="#CBD5E1"/>
          <text x="60" y="115" font-family="Arial" font-size="14" font-weight="bold" fill="#FFFFFF" text-anchor="middle">ALU</text>
        </g>

        <rect x="220" y="520" width="360" height="38" rx="10" fill="#FFFFFF" stroke="#059669" stroke-width="2"/>
        <text x="400" y="545" font-family="Arial" font-size="15" font-weight="bold" fill="#047857" text-anchor="middle">Đống rác hỗn hợp: Chai nhựa, Vỏ chuối, Giấy báo, Lon nhôm</text>
      </svg>
    `),
    mockResult: {
      success: true,
      total_objects: 4,
      objects: [
        {
          id: 1,
          name: 'Chai nhựa',
          category: 'recyclable',
          confidence: 0.96,
          bounding_box: { x_min: 130, y_min: 110, x_max: 290, y_max: 460 },
          disposal_advice: 'Đổ hết chất lỏng, làm sạch nếu cần và thu gom riêng để tái chế.',
          environmental_tip: 'Hạn chế sử dụng chai nhựa dùng một lần.',
          needs_review: false,
          material: 'Nhựa PET #1',
        },
        {
          id: 2,
          name: 'Vỏ chuối',
          category: 'organic',
          confidence: 0.97,
          bounding_box: { x_min: 500, y_min: 120, x_max: 760, y_max: 420 },
          disposal_advice: 'Đưa vào thùng rác hữu cơ hoặc sử dụng để ủ phân compost.',
          environmental_tip: 'Tận dụng rác hữu cơ để tạo phân bón dinh dưỡng cho cây trồng.',
          needs_review: false,
          material: 'Hữu cơ thực vật dễ phân hủy sinh học',
        },
        {
          id: 3,
          name: 'Giấy báo sạch',
          category: 'recyclable',
          confidence: 0.93,
          bounding_box: { x_min: 120, y_min: 560, x_max: 380, y_max: 870 },
          disposal_advice: 'Gom riêng và giữ khô để thuận tiện tái chế.',
          environmental_tip: 'Tái sử dụng giấy báo khi có thể để bảo vệ cây rừng.',
          needs_review: false,
          material: 'Giấy cellulose sạch',
        },
        {
          id: 4,
          name: 'Lon nhôm',
          category: 'recyclable',
          confidence: 0.95,
          bounding_box: { x_min: 520, y_min: 540, x_max: 720, y_max: 860 },
          disposal_advice: 'Thu gom riêng và đưa đến điểm thu gom kim loại tái chế.',
          environmental_tip: 'Nhôm có thể tái chế vô hạn lần, tiết kiệm 95% năng lượng.',
          needs_review: false,
          material: 'Nhôm (Aluminium)',
        },
      ],
      summary: {
        recyclable: 3,
        organic: 1,
        residual: 0,
        special: 0,
        unknown: 0,
      },
    },
  },

  // Test Case 1: A single banana peel
  {
    id: 'test-case-banana-peel',
    name: 'Vỏ chuối chín (Rác hữu cơ)',
    category: 'organic',
    description: 'Một vỏ chuối vàng tự nhiên từ bữa ăn nhẹ.',
    testCaseType: '1 món đơn lẻ (Hữu cơ)',
    imageUrl: createSvgDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
        <rect width="500" height="500" fill="#ECFDF5" rx="24"/>
        <g transform="translate(100, 60)">
          <path d="M 160 70 C 130 110 80 180 60 260 C 50 300 80 320 110 280 C 140 240 160 180 160 140 Z" fill="#FACC15" stroke="#CA8A04" stroke-width="3.5"/>
          <path d="M 160 70 C 180 110 240 180 270 260 C 285 295 255 320 220 280 C 190 240 170 180 160 140 Z" fill="#FDE047" stroke="#CA8A04" stroke-width="3.5"/>
          <rect x="153" y="55" width="16" height="25" rx="4" fill="#78350F"/>
          <circle cx="110" cy="220" r="5" fill="#78350F"/>
          <circle cx="210" cy="210" r="6" fill="#78350F"/>
        </g>
        <text x="250" y="440" font-family="Arial" font-size="18" font-weight="bold" fill="#047857" text-anchor="middle">Vỏ Chuối Chín Tự Nhiên</text>
      </svg>
    `),
    mockResult: {
      success: true,
      total_objects: 1,
      objects: [
        {
          id: 1,
          name: 'Vỏ chuối',
          category: 'organic',
          confidence: 0.98,
          bounding_box: { x_min: 120, y_min: 110, x_max: 760, y_max: 780 },
          disposal_advice: 'Đưa vào thùng rác hữu cơ hoặc sử dụng để ủ phân compost.',
          environmental_tip: 'Tận dụng rác hữu cơ để tạo phân bón cho cây.',
          needs_review: false,
          material: 'Chất hữu cơ thực vật phân hủy sinh học',
        },
      ],
      summary: { recyclable: 0, organic: 1, residual: 0, special: 0, unknown: 0 },
    },
  },

  // Test Case 2: A single plastic bottle
  {
    id: 'test-case-plastic-bottle',
    name: 'Chai nhựa nước suối',
    category: 'recyclable',
    description: 'Chai nhựa trong suốt PET số 1 rỗng sạch.',
    testCaseType: '1 món đơn lẻ (Tái chế)',
    imageUrl: createSvgDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
        <rect width="500" height="500" fill="#E0F2FE" rx="24"/>
        <defs>
          <linearGradient id="petGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#38BDF8"/>
            <stop offset="50%" stop-color="#E0F2FE"/>
            <stop offset="100%" stop-color="#0284C7"/>
          </linearGradient>
        </defs>
        <rect x="225" y="70" width="50" height="28" rx="6" fill="#0284C7"/>
        <rect x="232" y="98" width="36" height="30" fill="url(#petGrad)"/>
        <path d="M 232 128 C 190 155 185 185 185 220 L 185 390 C 185 410 195 420 215 420 L 285 420 C 305 420 315 410 315 390 L 315 220 C 315 185 310 155 268 128 Z" fill="url(#petGrad)" stroke="#0284C7" stroke-width="3"/>
        <circle cx="250" cy="280" r="30" fill="#FFFFFF" opacity="0.9"/>
        <text x="250" y="287" font-family="Arial" font-size="18" font-weight="bold" fill="#0284C7" text-anchor="middle">PET 1</text>
        <text x="250" y="470" font-family="Arial" font-size="18" font-weight="bold" fill="#0369A1" text-anchor="middle">Chai Nhựa PET Sạch</text>
      </svg>
    `),
    mockResult: {
      success: true,
      total_objects: 1,
      objects: [
        {
          id: 1,
          name: 'Chai nhựa',
          category: 'recyclable',
          confidence: 0.96,
          bounding_box: { x_min: 360, y_min: 140, x_max: 640, y_max: 850 },
          disposal_advice: 'Đổ hết chất lỏng, làm sạch nếu cần và thu gom riêng để tái chế.',
          environmental_tip: 'Hạn chế sử dụng chai nhựa dùng một lần.',
          needs_review: false,
          material: 'Nhựa PET #1',
        },
      ],
      summary: { recyclable: 1, organic: 0, residual: 0, special: 0, unknown: 0 },
    },
  },

  // Test Case 3: A clean aluminum can
  {
    id: 'test-case-aluminum-can',
    name: 'Lon nhôm nước ngọt sạch',
    category: 'recyclable',
    description: 'Vỏ lon nhôm kim loại rỗng sạch khô ráo.',
    testCaseType: '1 món đơn lẻ (Kim loại)',
    imageUrl: createSvgDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
        <rect width="500" height="500" fill="#FEE2E2" rx="24"/>
        <ellipse cx="250" cy="130" rx="90" ry="24" fill="#E2E8F0" stroke="#64748B" stroke-width="2.5"/>
        <path d="M 160 130 L 160 380 C 160 405 200 420 250 420 C 300 420 340 405 340 380 L 340 130 Z" fill="#DC2626" stroke="#991B1B" stroke-width="3"/>
        <ellipse cx="250" cy="130" rx="60" ry="16" fill="#CBD5E1"/>
        <circle cx="250" cy="270" r="38" fill="#FFFFFF" opacity="0.9"/>
        <text x="250" y="278" font-family="Arial" font-size="20" font-weight="bold" fill="#DC2626" text-anchor="middle">ALU</text>
        <text x="250" y="470" font-family="Arial" font-size="18" font-weight="bold" fill="#991B1B" text-anchor="middle">Vỏ Lon Nhôm Sạch</text>
      </svg>
    `),
    mockResult: {
      success: true,
      total_objects: 1,
      objects: [
        {
          id: 1,
          name: 'Vỏ lon nhôm',
          category: 'recyclable',
          confidence: 0.95,
          bounding_box: { x_min: 310, y_min: 220, x_max: 690, y_max: 860 },
          disposal_advice: 'Thu gom riêng và đưa đến điểm thu gom kim loại tái chế.',
          environmental_tip: 'Tái chế vỏ lon nhôm tiết kiệm 95% điện năng so với sản xuất từ quặng bô-xít.',
          needs_review: false,
          material: 'Nhôm (Aluminium)',
        },
      ],
      summary: { recyclable: 1, organic: 0, residual: 0, special: 0, unknown: 0 },
    },
  },

  // Test Case Special: Batteries and broken bulbs (Special/Hazardous Waste)
  {
    id: 'test-case-battery-special',
    name: 'Pin cũ & Bóng đèn (Rác nguy hại)',
    category: 'special',
    description: 'Pin tiểu AA và bóng đèn huỳnh quang cần biện pháp thu gom riêng.',
    testCaseType: 'Rác nguy hại / Đặc thù',
    imageUrl: createSvgDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
        <rect width="500" height="500" fill="#FEF2F2" rx="24"/>
        <!-- Battery Item -->
        <g transform="translate(90, 80)">
          <rect x="55" y="40" width="40" height="18" rx="4" fill="#B91C1C"/>
          <rect x="35" y="58" width="80" height="180" rx="10" fill="#1E293B" stroke="#B91C1C" stroke-width="3"/>
          <rect x="35" y="58" width="80" height="60" rx="4" fill="#DC2626"/>
          <text x="75" y="95" font-family="Arial" font-size="20" font-weight="black" fill="#FFFFFF" text-anchor="middle">+</text>
          <text x="75" y="165" font-family="Arial" font-size="14" font-weight="bold" fill="#F87171" text-anchor="middle">AA 1.5V</text>
        </g>
        <!-- Compact Bulb -->
        <g transform="translate(260, 80)">
          <path d="M 50 40 Q 90 20 110 60 Q 90 120 75 160 L 50 160 Z" fill="#FEF08A" stroke="#CA8A04" stroke-width="2.5" opacity="0.9"/>
          <rect x="45" y="160" width="45" height="30" fill="#94A3B8" stroke="#475569" stroke-width="2"/>
          <path d="M 50 190 L 85 190 L 80 205 L 55 205 Z" fill="#64748B"/>
        </g>
        <!-- Warning Icon -->
        <circle cx="250" cy="330" r="32" fill="#EF4444"/>
        <text x="250" y="342" font-family="Arial" font-size="28" font-weight="black" fill="#FFFFFF" text-anchor="middle">!</text>
        <text x="250" y="450" font-family="Arial" font-size="18" font-weight="bold" fill="#991B1B" text-anchor="middle">Rác Thải Nguy Hại: Pin & Bóng Đèn</text>
      </svg>
    `),
    mockResult: {
      success: true,
      total_objects: 2,
      objects: [
        {
          id: 1,
          name: 'Pin tiểu AA đã qua sử dụng',
          category: 'special',
          confidence: 0.98,
          bounding_box: { x_min: 180, y_min: 190, x_max: 440, y_max: 820 },
          disposal_advice: 'TUYỆT ĐỐI KHÔNG vứt vào thùng rác thông thường. Hãy thu gom riêng và mang đến các điểm thu hồi pin cũ.',
          environmental_tip: 'Một viên pin cũ có thể làm ô nhiễm 500 lít nước và 1m³ đất trong vòng 50 năm do rò rỉ chì, thủy ngân.',
          needs_review: false,
          material: 'Pin kiềm Alkaline / Kim loại nặng độc hại',
          is_hazardous: true,
        },
        {
          id: 2,
          name: 'Bóng đèn huỳnh quang / compact vỡ',
          category: 'special',
          confidence: 0.94,
          bounding_box: { x_min: 520, y_min: 210, x_max: 840, y_max: 790 },
          disposal_advice: 'Bọc cẩn thận bằng giấy báo dày, đánh dấu cảnh báo vật sắc nhọn và mang đến điểm tiếp nhận rác nguy hại.',
          environmental_tip: 'Bóng đèn huỳnh quang chứa hơi thủy ngân độc hại cho hệ thần kinh.',
          needs_review: false,
          material: 'Thủy tinh & hơi thủy ngân độc hại',
          is_hazardous: true,
        },
      ],
      summary: { recyclable: 0, organic: 0, residual: 0, special: 2, unknown: 0 },
      image_quality_notes: 'Nhận diện chuẩn xác nhóm Rác Nguy Hại / Đặc Thù cần biện pháp thu gom riêng biệt.',
    },
  },

  // Test Case 5: A blurry waste image
  {
    id: 'test-case-blurry-image',
    name: 'Ảnh rác bị mờ (Cần chụp lại)',
    category: 'unknown',
    description: 'Mẫu thử nghiệm xử lý ảnh mờ hoặc không đủ ánh sáng.',
    testCaseType: 'Ảnh mờ / Thiếu chi tiết',
    imageUrl: createSvgDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
        <rect width="500" height="500" fill="#FFFBEB" rx="24"/>
        <filter id="blurTest">
          <feGaussianBlur stdDeviation="15" />
        </filter>
        <g filter="url(#blurTest)" opacity="0.75">
          <circle cx="200" cy="220" r="90" fill="#94A3B8"/>
          <rect x="220" y="190" width="140" height="130" fill="#EA580C"/>
        </g>
        <circle cx="250" cy="240" r="45" fill="#F59E0B"/>
        <text x="250" y="258" font-family="Arial" font-size="52" font-weight="bold" fill="#FFFFFF" text-anchor="middle">?</text>
        <text x="250" y="450" font-family="Arial" font-size="18" font-weight="bold" fill="#B45309" text-anchor="middle">Mẫu Ảnh Bị Mờ Nét</text>
      </svg>
    `),
    mockResult: {
      success: true,
      total_objects: 1,
      objects: [
        {
          id: 1,
          name: 'Vật thể mờ chưa rõ hình dáng',
          category: 'unknown',
          confidence: 0.45,
          bounding_box: null, // As required: no inaccurate box
          disposal_advice: 'Vui lòng chụp lại ảnh rõ nét hơn ở cự ly gần để phân loại chính xác.',
          environmental_tip: 'Quan sát ký hiệu tái chế hoặc kiểm tra độ sạch bẩn trước khi vứt.',
          needs_review: true,
          material: 'Không thể xác định do ảnh mờ',
        },
      ],
      summary: { recyclable: 0, organic: 0, residual: 0, special: 0, unknown: 1 },
      image_quality_notes: 'Ảnh bị mờ nét hoặc quá tối, không thể trích xuất viền tọa độ chính xác.',
    },
  },

  // Test Case 6: An image containing objects that cannot be identified
  {
    id: 'test-case-unidentified-composite',
    name: 'Đồ vật composite lạ / Chưa xác định',
    category: 'unknown',
    description: 'Vật thể lạ nhiều lớp vật liệu pha tạp khó xác định.',
    testCaseType: 'Vật thể lạ / Khó phân loại',
    imageUrl: createSvgDataUri(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
        <rect width="500" height="500" fill="#F3F4F6" rx="24"/>
        <g transform="translate(120, 100)">
          <polygon points="50,20 220,50 190,240 20,200" fill="#9CA3AF" stroke="#4B5563" stroke-width="3"/>
          <path d="M 40 80 Q 150 140 200 90" stroke="#DC2626" stroke-width="8" fill="none"/>
          <circle cx="120" cy="140" r="30" fill="#3B82F6" opacity="0.8"/>
          <rect x="80" y="180" width="90" height="30" fill="#EAB308"/>
        </g>
        <text x="250" y="450" font-family="Arial" font-size="18" font-weight="bold" fill="#374151" text-anchor="middle">Vật Thể Hỗn Hợp Lạ Chưa Xác Định</text>
      </svg>
    `),
    mockResult: {
      success: true,
      total_objects: 1,
      objects: [
        {
          id: 1,
          name: 'Vật phẩm composite chưa xác định',
          category: 'unknown',
          confidence: 0.52,
          bounding_box: { x_min: 240, y_min: 200, x_max: 680, y_max: 680 },
          disposal_advice: 'Nếu là vật liệu đa lớp dính liền không thể tách rời, hãy bỏ vào thùng rác còn lại.',
          environmental_tip: 'Ưu tiên sử dụng sản phẩm đơn chất liệu để dễ thu hồi tái chế.',
          needs_review: true,
          material: 'Vật liệu tổng hợp nhiều lớp',
        },
      ],
      summary: { recyclable: 0, organic: 0, residual: 0, special: 0, unknown: 1 },
      image_quality_notes: 'Vật thể cấu tạo phức tạp, khuyến nghị học sinh kiểm tra trực tiếp.',
    },
  },
];
