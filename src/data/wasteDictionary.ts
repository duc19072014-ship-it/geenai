import { WasteCategory } from '../types/waste';

export interface WasteCategoryGuide {
  id: WasteCategory;
  name: string;
  tagline: string;
  colorName: string;
  badgeBg: string;
  badgeText: string;
  borderColor: string;
  accentColor: string;
  binColorName: string;
  binColorHex: string;
  binIcon: string;
  examples: string[];
  disposalRules: string[];
  notAllowed: string[];
  whyImportant: string;
}

export const WASTE_CATEGORIES_GUIDE: WasteCategoryGuide[] = [
  {
    id: 'Rác tái chế',
    name: 'Rác Tái Chế (Nhóm 1)',
    tagline: 'Thu hồi tài nguyên – Tái sinh cuộc sống mới',
    colorName: 'Xanh dương / Trắng',
    badgeBg: 'bg-blue-100 text-blue-800',
    badgeText: 'text-blue-700',
    borderColor: 'border-blue-300',
    accentColor: '#0284c7',
    binColorName: 'Thùng màu Xanh Lam hoặc Trắng',
    binColorHex: '#0284c7',
    binIcon: '♻️',
    examples: [
      'Chai nhựa PET trong suốt (nước khoáng, nước ngọt)',
      'Vỏ lon nhôm (lon nước ngọt, bia, nước trái cây)',
      'Sách giáo khoa cũ, vở viết, giấy A4, báo chí',
      'Thùng bìa carton, hộp giấy gói hàng sạch',
      'Chai, lọ thủy tinh còn nguyên vẹn',
      'Vỏ hộp sữa giấy Tetra Pak (đã bóc dẹp và tráng sạch)',
      'Đồ dùng bằng kim loại: thìa sắt cũ, đinh ốc vụn'
    ],
    disposalRules: [
      'Đổ hết chất lỏng và vụn thức ăn còn đọng bên trong.',
      'Tráng sơ bằng một ít nước và để khô ráo.',
      'Tháo nhãn nilon, tách nắp chai nếu có thể.',
      'Bóp bẹp thân chai/lon hoặc gấp dẹp bìa carton để tiết kiệm diện tích thùng rác.'
    ],
    notAllowed: [
      'Không bỏ giấy dính dầu mỡ, giấy vệ sinh đã dùng.',
      'Không bỏ đồ gốm sứ sành sứ hoặc gương vỡ vào thùng kính.',
      'Không bỏ chai lọ chứa hóa chất tẩy rửa độc hại chưa xử lý.'
    ],
    whyImportant: 'Giúp tiết kiệm đến 95% năng lượng so với sản xuất từ nguyên liệu thô và bảo vệ tài nguyên thiên nhiên.'
  },
  {
    id: 'Rác hữu cơ',
    name: 'Rác Hữu Cơ (Nhóm 2)',
    tagline: 'Dễ phân hủy – Nguồn dinh dưỡng vàng cho cây cỏ',
    colorName: 'Xanh lá cây',
    badgeBg: 'bg-emerald-100 text-emerald-800',
    badgeText: 'text-emerald-700',
    borderColor: 'border-emerald-300',
    accentColor: '#10b981',
    binColorName: 'Thùng màu Xanh Lá Cây',
    binColorHex: '#10b981',
    binIcon: '🍃',
    examples: [
      'Vỏ trái cây: vỏ chuối, vỏ cam, vỏ dưa hấu, cùi táo',
      'Thức ăn thừa, cơm nguội sau bữa ăn bán trú',
      'Cuống rau, rễ rau củ bị hỏng, bẹ cải úa',
      'Bã trà, bã cà phê, bã đậu nành',
      'Lá bàng, hoa rụng quét từ sân trường',
      'Vỏ trứng gà, xương cá nhỏ dễ mủn'
    ],
    disposalRules: [
      'Để ráo nước tối đa trước khi bỏ vào thùng để tránh bốc mùi hôi thối.',
      'Bỏ trực tiếp vào thùng hoặc dùng túi sinh học tự phân hủy.',
      'Ủ thành phân hữu cơ (compost) bón cho cây xanh tại vườn trường.'
    ],
    notAllowed: [
      'TUYỆT ĐỐI KHÔNG bọc trong túi nilon thông thường khi vứt vào thùng ủ phân.',
      'Không bỏ xương ống gia súc lớn, vỏ sò vỏ ốc cứng dày (vì rất khó phân hủy).',
      'Không lẫn tàn thuốc lá hoặc hóa chất.'
    ],
    whyImportant: 'Rác hữu cơ chiếm hơn 50-60% tổng rác thải sinh hoạt. Phân loại tốt sẽ giảm phát thải khí mê-tan gây hiệu ứng nhà kính và tạo ra phân bón sinh học xanh.'
  },
  {
    id: 'Rác còn lại',
    name: 'Rác Còn Lại (Nhóm 3)',
    tagline: 'Không tái chế được – Cần xử lý chôn lấp hoặc tiêu hủy an toàn',
    colorName: 'Xám / Cam',
    badgeBg: 'bg-slate-100 text-slate-800',
    badgeText: 'text-slate-700',
    borderColor: 'border-slate-300',
    accentColor: '#64748b',
    binColorName: 'Thùng màu Xám hoặc Cam',
    binColorHex: '#64748b',
    binIcon: '🗑️',
    examples: [
      'Khăn giấy ăn bẩn dính dầu mỡ, tăm bông, giấy vệ sinh',
      'Bao bì bánh snack, túi nilon bẩn dính dầu mỡ',
      'Hộp xốp ăn sáng dính sốt không rửa sạch được',
      'Mảnh chén bát sứ, sành vỡ (gói giấy báo an toàn)',
      'Bút bi hết mực, bút xóa, vỏ keo dán khô',
      'Bụi quét nhà, đầu lọc thuốc lá'
    ],
    disposalRules: [
      'Gói gọn gàng trong túi rác kín trước khi cho vào thùng rác còn lại.',
      'Với vật sắc nhọn (mảnh gốm vỡ), cần bọc nhiều lớp giấy báo ghi chú bên ngoài để không làm đứt tay cô chú lao công.',
      'Để ráo nước đối với rác sinh hoạt ẩm ướt.'
    ],
    notAllowed: [
      'Không vứt thức ăn thừa lẫn vào đây.',
      'Không vứt chai lọ tái chế sạch vào đây gây lãng phí tài nguyên.',
      'TUYỆT ĐỐI KHÔNG vứt pin, ắc quy, bóng đèn vào thùng rác còn lại.'
    ],
    whyImportant: 'Được vận chuyển đến nhà máy đốt rác phát điện hoặc bãi chôn lấp hợp vệ sinh theo quy chuẩn kỹ thuật.'
  },
  {
    id: 'Rác nguy hại / Đặc thù',
    name: 'Rác Nguy Hại & Điện Tử (Nhóm 4)',
    tagline: 'Độc hại cao – Tuyệt đối thu gom riêng theo quy định',
    colorName: 'Đỏ / Tím',
    badgeBg: 'bg-red-100 text-red-800',
    badgeText: 'text-red-700',
    borderColor: 'border-red-300',
    accentColor: '#ef4444',
    binColorName: 'Thùng Đỏ hoặc Điểm Thu Gom Pin Cũ',
    binColorHex: '#ef4444',
    binIcon: '⚠️',
    examples: [
      'Pin cũ (pin tiểu AA, AAA, pin cúc áo trong đồng hồ/đồ chơi)',
      'Ắc quy xe đạp điện, xe máy hỏng',
      'Bóng đèn huỳnh quang, bóng đèn compact (chứa thủy ngân)',
      'Rác thải điện tử: cáp sạc đứt, tai nghe hỏng, bo mạch điện tử',
      'Vỏ chai lọ đựng hóa chất tẩy rửa mạnh, thuốc sâu, hộp sơn',
      'Nhiệt kế thủy ngân vỡ, kim tiêm y tế gia đình'
    ],
    disposalRules: [
      'Bỏ vào hộp "Thu gom pin cũ" tại trường học hoặc siêu thị.',
      'Bọc kỹ bóng đèn huỳnh quang vỡ bằng hộp carton để tránh phát tán thủy ngân.',
      'Mang rác điện tử đến các điểm Ngày hội Tái chế hoặc trạm xử lý chất thải nguy hại.'
    ],
    notAllowed: [
      'TUYỆT ĐỐI KHÔNG đốt pin hay thiết bị điện tử vì nguy cơ cháy nổ cực kỳ nguy hiểm.',
      'Không vứt chung vào thùng rác hữu cơ hoặc rác tái chế thông thường.'
    ],
    whyImportant: 'Một viên pin nhỏ có thể làm ô nhiễm 500 lít nước ngầm và 1m³ đất trong 50 năm. Thủy ngân trong bóng đèn gây tổn thương não và phổi.'
  }
];

export interface WasteItemLookup {
  id: string;
  name: string;
  category: WasteCategory;
  binColor: string;
  material: string;
  tip: string;
}

export const COMMON_WASTE_ITEMS: WasteItemLookup[] = [
  {
    id: 'special-1',
    name: 'Pin tiểu AA / AAA hết hạn',
    category: 'Rác nguy hại / Đặc thù',
    binColor: 'Thùng Đỏ / Hộp Thu Gom Pin',
    material: 'Pin kiềm chứa kim loại nặng',
    tip: 'Bỏ vào hộp thu gom pin cũ tại trường học, không vứt bừa bãi.'
  },
  {
    id: 'special-2',
    name: 'Bóng đèn huỳnh quang / compact vỡ',
    category: 'Rác nguy hại / Đặc thù',
    binColor: 'Thùng Đỏ / Trạm Nguy Hại',
    material: 'Thủy tinh & hơi thủy ngân',
    tip: 'Bọc kín trong hộp bìa, tránh hít phải bụi và hơi thủy ngân.'
  },
  {
    id: 'special-3',
    name: 'Cáp sạc điện thoại bị đứt ruột',
    category: 'Rác nguy hại / Đặc thù',
    binColor: 'Điểm Thu Gom Rác Điện Tử',
    material: 'Dây đồng bọc vỏ nhựa PVC',
    tip: 'Gom cùng rác điện tử để thu hồi lõi đồng quý giá.'
  },
  {
    id: '1',
    name: 'Vỏ chai nước suối nhựa trong',
    category: 'Rác tái chế',
    binColor: 'Thùng Xanh Lam / Trắng',
    material: 'Nhựa PET #1',
    tip: 'Uống cạn nước, tháo nhãn và bóp dẹp thân chai.'
  },
  {
    id: '2',
    name: 'Vỏ chuối chín / Vỏ cam quýt',
    category: 'Rác hữu cơ',
    binColor: 'Thùng Xanh Lá',
    material: 'Hữu cơ thực vật',
    tip: 'Bỏ trực tiếp, không cho vào túi nilon.'
  },
  {
    id: '3',
    name: 'Bao bì gói bim bim / snack',
    category: 'Rác còn lại',
    binColor: 'Thùng Xám / Cam',
    material: 'Màng ghép nhôm nhựa bẩn',
    tip: 'Gấp gọn lại, thuộc nhóm rác khó tái chế.'
  },
  {
    id: '4',
    name: 'Lon nước ngọt Coca/Pepsi',
    category: 'Rác tái chế',
    binColor: 'Thùng Xanh Lam / Trắng',
    material: 'Nhôm kim loại',
    tip: 'Đổ hết nước, gập khoen giật và ép dẹp lon.'
  },
  {
    id: '5',
    name: 'Vỏ hộp sữa giấy Milo / Vinamilk',
    category: 'Rác tái chế',
    binColor: 'Thùng Xanh Lam / Trắng',
    material: 'Giấy Tetra Pak nhiều lớp',
    tip: 'Uống hết sữa, bóc 2 tai hộp, gấp dẹp và cắm ống hút vào trong.'
  },
  {
    id: '6',
    name: 'Hộp xốp đựng xôi / bánh bao dính mỡ',
    category: 'Rác còn lại',
    binColor: 'Thùng Xám / Cam',
    material: 'Nhựa xốp EPS dính bẩn',
    tip: 'Gạt sạch vụn thức ăn vào thùng hữu cơ, gấp hộp xốp vứt thùng còn lại.'
  },
  {
    id: '7',
    name: 'Sách giáo khoa cũ / Vở bài tập',
    category: 'Rác tái chế',
    binColor: 'Thùng Xanh Lam / Trắng',
    material: 'Giấy cellulose',
    tip: 'Gom phẳng phiu, buộc dây gọn gàng gửi kế hoạch nhỏ.'
  },
  {
    id: '8',
    name: 'Cơm nguội / Thức ăn thừa căng tin',
    category: 'Rác hữu cơ',
    binColor: 'Thùng Xanh Lá',
    material: 'Chất hữu cơ dễ phân hủy',
    tip: 'Gạt vào khay rác hữu cơ để làm thức ăn chăn nuôi hoặc ủ phân.'
  },
  {
    id: '9',
    name: 'Bút bi hết mực / Ruột bút bi',
    category: 'Rác còn lại',
    binColor: 'Thùng Xám / Cam',
    material: 'Nhựa hỗn hợp & mực hóa học',
    tip: 'Thuộc rác còn lại do có ngòi kim loại dính mực không tái chế phổ thông.'
  },
  {
    id: '10',
    name: 'Lá bàng / Cành cây nhỏ rụng trên sân',
    category: 'Rác hữu cơ',
    binColor: 'Thùng Xanh Lá',
    material: 'Chất hữu cơ thực vật',
    tip: 'Gom vào gốc cây hoặc thùng ủ lá làm mùn bón cây.'
  },
  {
    id: '11',
    name: 'Khăn giấy ăn đã qua sử dụng dính nước sốt',
    category: 'Rác còn lại',
    binColor: 'Thùng Xám / Cam',
    material: 'Giấy ẩm bẩn',
    tip: 'Sợi giấy đã bị rã và dính bẩn không thể tái chế thành giấy mới.'
  },
  {
    id: '12',
    name: 'Viên pin tiểu AA / AAA hết điện',
    category: 'Rác còn lại',
    binColor: 'Hộp thu gom Pin riêng (Nguy hại)',
    material: 'Kim loại nặng: Chì, Thủy ngân, Kẽm',
    tip: 'Tuyệt đối không vứt vào thùng rác chung! Mang đến hộp pin ở thư viện/siêu thị.'
  },
  {
    id: '13',
    name: 'Thùng giấy carton đóng sách',
    category: 'Rác tái chế',
    binColor: 'Thùng Xanh Lam / Trắng',
    material: 'Giấy sóng carton',
    tip: 'Bóc băng dính nhựa, gấp phẳng lại.'
  },
  {
    id: '14',
    name: 'Ly trà sữa bằng nhựa PP',
    category: 'Rác tái chế',
    binColor: 'Thùng Xanh Lam / Trắng',
    material: 'Nhựa Polypropylene #5',
    tip: 'Đổ hết trà sữa và trân châu thừa vào thùng hữu cơ, súc sạch ly rồi bỏ tái chế.'
  },
  {
    id: '15',
    name: 'Túi nilon quai xách sạch',
    category: 'Rác tái chế',
    binColor: 'Thùng Xanh Lam / Trắng',
    material: 'Nhựa màng PE sạch',
    tip: 'Tái sử dụng nhiều lần để đựng đồ, nếu rách thì gom sạch lại tái chế.'
  },
  {
    id: '16',
    name: 'Ống hút nhựa dùng một lần',
    category: 'Rác còn lại',
    binColor: 'Thùng Xám / Cam',
    material: 'Nhựa nhỏ khó thu gom',
    tip: 'Kích thước nhỏ khó tái chế, nên hạn chế sử dụng bằng cách dùng ống hút inox.'
  }
];
