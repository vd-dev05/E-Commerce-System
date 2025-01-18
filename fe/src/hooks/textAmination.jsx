import { TypeAnimation } from 'react-type-animation';
const TypingEffectProfile = ({nameUser}) =>  {
    // const displayName = nameUser || 'user'; 
      
   
    const arr = [`Welcome ${ nameUser ? nameUser : 'user' } 👋`,3500,"Siêu Sale Giá Hời",3500,"Thêm voucher yêu thích của bạn ", 3500 , "Tết 2025 Deal hời xuân mới"]
    return (
        <h1 className="font-logo text-right">
            <TypeAnimation
                sequence={arr} // Thay đổi thời gian hiển thị
                // speed={1}
                repeat={100} 
                cursor = {false}
            />
        </h1>
    );
}
export default TypingEffectProfile