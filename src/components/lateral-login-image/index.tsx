import Logo from '../../assets/image-login.png'

export function LateralLoginImage() {
    return(
        <div className='hidden lg:block'>
            <img className='w-full h-screen object-cover' src={Logo} />
        </div>
    );
}