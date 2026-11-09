import { QuizQuestion } from '../types/waste';

export const ECO_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Sau giờ ra chơi, bạn uống xong hộp sữa giấy học đường. Cách xử lý nào sau đây là ĐÚNG NHẤT?',
    options: [
      'Vo tròn rồi ném ngay vào thùng rác bất kỳ.',
      'Bóc mở 2 tai hộp, uống cạn giọt cuối cùng, làm dẹp và bỏ vào thùng rác tái chế.',
      'Bỏ nguyên hộp còn thừa sữa vào thùng rác hữu cơ.',
      'Cắt vụn hộp sữa vứt rải rác dưới gốc cây.'
    ],
    correctIndex: 1,
    explanation: 'Chính xác! Vỏ hộp sữa giấy nhiều lớp (Tetra Pak) là rác tái chế quý giá. Bóc tai hộp và làm dẹp giúp tiết kiệm không gian và giữ vệ sinh để tái chế thành tấm lợp sinh thái.',
    category: 'Rác tái chế'
  },
  {
    id: 2,
    question: 'Vỏ chuối, cùi táo và cuống rau sau bữa ăn bán trú ở trường thuộc nhóm rác nào và bỏ vào thùng màu gì?',
    options: [
      'Rác tái chế – Thùng màu xanh dương.',
      'Rác hữu cơ – Thùng màu xanh lá cây.',
      'Rác còn lại – Thùng màu xám hoặc cam.',
      'Rác nguy hại – Hộp màu đỏ.'
    ],
    correctIndex: 1,
    explanation: 'Rất chuẩn! Thức ăn thừa, vỏ hoa quả là rác hữu cơ dễ phân hủy, được quy định bỏ vào thùng màu Xanh Lá Cây để ủ thành phân bón vi sinh cho cây trồng.',
    category: 'Rác hữu cơ'
  },
  {
    id: 3,
    question: 'Hộp xốp đựng bánh bao ăn sáng bị dính đầy dầu mỡ và tương ớt (không thể rửa sạch) thuộc nhóm rác nào?',
    options: [
      'Rác hữu cơ vì đựng đồ ăn.',
      'Rác tái chế vì làm bằng nhựa.',
      'Rác còn lại vì đã bị nhiễm bẩn hữu cơ nặng, không thể tái chế sạch.',
      'Rác tự tiêu biến trong 1 ngày.'
    ],
    correctIndex: 2,
    explanation: 'Đúng rồi! Khi hộp xốp hoặc bao bì nhựa bị dính dầu mỡ không rửa sạch được, chúng sẽ làm ô nhiễm cả lô rác tái chế nên bắt buộc phải xếp vào nhóm Rác Còn Lại.',
    category: 'Rác còn lại'
  },
  {
    id: 4,
    question: 'Viên pin đồng hồ hoặc pin đồ chơi đã cạn năng lượng thì bạn nên làm gì?',
    options: [
      'Vứt ngay vào thùng rác còn lại hoặc thùng rác hữu cơ.',
      'Đem đốt trong lò sưởi hoặc chôn xuống bồn hoa.',
      'Gom lại để vào hộp thu gom pin cũ riêng (rác nguy hại), không vứt chung rác sinh hoạt.',
      'Ném xuống hồ nước công viên.'
    ],
    correctIndex: 2,
    explanation: 'Xuất sắc! Pin chứa kim loại nặng cực độc (chì, thủy ngân, cadimi). Một viên pin vứt ra đất có thể làm ô nhiễm 500 lít nước hoặc 1 mét khối đất trong 50 năm. Hãy mang pin đến các điểm thu gom chuyên biệt nhé!',
    category: 'Rác nguy hại / Đặc thù'
  },
  {
    id: 5,
    question: 'Trong phong trào bảo vệ môi trường, quy tắc "3T" (3R) đại diện cho 3 hành động nào?',
    options: [
      'Tìm kiếm – Tích trữ – Tiêu thụ (Search – Store – Spend).',
      'Tiết giảm – Tái sử dụng – Tái chế (Reduce – Reuse – Recycle).',
      'Tập hợp – Tẩy rửa – Tiêu hủy (Gather – Wash – Destroy).',
      'Tiết kiệm – Trồng cây – Tưới nước (Save – Plant – Water).'
    ],
    correctIndex: 1,
    explanation: 'Chính xác 100%! 3T (Reduce - Reuse - Recycle) là kim chỉ nam của lối sống xanh: Tiết giảm rác thải ngay từ đầu, Tái sử dụng đồ cũ nhiều lần, và Phân loại để Tái chế.',
    category: 'Kiến thức chung'
  }
];
