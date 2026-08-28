export interface BotMessage {
  id: string
  text: string
  mood: 'normal' | 'happy' | 'curious' | 'flying' | 'startled'
  actionHint?: string
  link?: string
}

export const GREETING_MESSAGES: BotMessage[] = [
  {
    id: 'greet-1',
    text: 'Xin chào! Chào mừng bạn đến với Dev Space của Dương Bảo Đạt! 🛸✨',
    mood: 'happy',
  },
  {
    id: 'greet-2',
    text: 'Tôi là AERO-01, bot đồng hành của bạn trong chuyến thám hiểm không gian này! 🤖',
    mood: 'normal',
  },
  {
    id: 'greet-3',
    text: 'Đang theo chân bạn... Bạn đang khám phá portfolio Game Developer & Software Engineer! 🚀',
    mood: 'curious',
  },
  {
    id: 'greet-cursor-1',
    text: 'Hi bạn! Cần tôi giới thiệu các dự án nổi bật của Đạt không? ^‿^',
    mood: 'happy',
  },
  {
    id: 'greet-cursor-2',
    text: 'Bắt được bạn rồi! Đang ngắm nghía phần nào của trang web thế? 👀✨',
    mood: 'curious',
  },
]

export const STARTLED_MESSAGES: BotMessage[] = [
  {
    id: 'startled-1',
    text: 'Oái! Giật cả mình! 💨 Rút lui khẩn cấp!',
    mood: 'startled',
  },
  {
    id: 'startled-2',
    text: 'Vèo! Về góc trốn đây! 🛸💨',
    mood: 'startled',
  },
  {
    id: 'startled-3',
    text: 'Aaa di chuyển rồi! ⚡',
    mood: 'startled',
  },
]

export const PROJECT_TIPS: BotMessage[] = [
  {
    id: 'tip-vectoarena',
    text: 'Khám phá VectoArena - Game sinh tồn multiplayer thời gian thực xây dựng bằng Unity 6 & Colyseus! 🎮⚔️',
    mood: 'happy',
    link: '#vectoarena',
    actionHint: 'Xem dự án',
  },
  {
    id: 'tip-unifire',
    text: 'Thích game pixel đối kháng 2D tốc độ cao? Thử xem qua Unifire2D nhé! 🔥🥊',
    mood: 'curious',
    link: '#unifire2d',
    actionHint: 'Xem dự án',
  },
  {
    id: 'tip-caro',
    text: 'Bạn có muốn thử thách một ván cờ caro online thời gian thực? Check Caro Game Web! 🕹️',
    mood: 'happy',
    link: '#caro-game-web',
    actionHint: 'Xem dự án',
  },
]

export const FEATURE_TIPS: BotMessage[] = [
  {
    id: 'tip-warp',
    text: 'Tip: Bạn có thể bật/tắt hiệu ứng bay xuyên không gian (Warp Speed) ở nút Play/Pause trên thanh điều hướng! ⚡',
    mood: 'curious',
  },
  {
    id: 'tip-resume',
    text: 'Bạn đang tìm kiếm ứng viên Game Dev tiềm năng? Xem ngay CV của Đạt ở nút Resume nhé! 📄',
    mood: 'happy',
    link: '/resume/DuongBaoDat_DeveloperInternFresher_CV.pdf',
    actionHint: 'Mở Resume',
  },
  {
    id: 'tip-contact',
    text: 'Có ý tưởng làm game hoặc dự án mới? Đừng ngần ngại nhắn cho Đạt qua phần Liên hệ ở cuối trang nhé! ✉️',
    mood: 'normal',
    link: '#contact-form',
    actionHint: 'Gửi tin nhắn',
  },
]

export const CLICK_REACTIONS: BotMessage[] = [
  {
    id: 'click-1',
    text: 'Bleep bloop! Động cơ đẩy phản lực đang hoạt động ở 100% công suất! ⚡✨',
    mood: 'happy',
  },
  {
    id: 'click-2',
    text: 'Hehe nhột quá! Cảm ơn bạn đã ghé thăm portfolio của Dương Bảo Đạt nhé! ^‿^',
    mood: 'happy',
  },
  {
    id: 'click-3',
    text: 'Bạn có biết? Đạt cực kỳ đam mê tối ưu gameplay mượt mà và kết nối mạng multiplayer!',
    mood: 'curious',
  },
  {
    id: 'click-4',
    text: 'Đang theo dõi tọa độ con trỏ chuột của bạn... Tốc độ phản xạ rất tốt! 🎯',
    mood: 'curious',
  },
  {
    id: 'click-5',
    text: 'Warp Drive đã sẵn sàng! Chúc bạn có một trải nghiệm thật vui vẻ tại đây! 🌌🌟',
    mood: 'flying',
  },
]

export const SWOOP_MESSAGES: BotMessage[] = [
  {
    id: 'swoop-1',
    text: 'Vèo! Đang tuần tra khu vực không gian code! 🛸💫',
    mood: 'flying',
  },
  {
    id: 'swoop-2',
    text: 'Quét toàn bộ hệ thống... Mọi thứ đều sẵn sàng! 🚀✨',
    mood: 'happy',
  },
  {
    id: 'swoop-3',
    text: 'Tuần tra định kỳ! Bạn đang xem đến đâu rồi? 👀',
    mood: 'curious',
  },
]
