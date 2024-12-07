import { assets } from '@/assets/assets'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { LogOut, Menu, Settings, ShoppingCart, User, UserCog, UserCog2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import ShopMenuItems from './menu'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { logoutUser } from '@/store/auth-slice'
import { toast } from '@/hooks/use-toast'
import UserCartWrapper from './cart-warpper'
import { fetchCartItems } from '@/store/shop-slice/cart-slice'


const ShoppingHeader = () => {

    const { isAuthenticated, user } = useSelector(state => state.auth)
    const { cartItems } = useSelector(state => state.shopCart)
    const [openCart, setOpenCart] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleLogout = () => {
        dispatch(logoutUser()).then((data) => {
            if (data?.payload?.success) {
                navigate('/auth/login')
                toast({
                    title: data.payload.message
                })
            }
        })
    }

    const getCartCount = () => {
        if (!cartItems?.items) return 0;
        return cartItems.items.reduce((total, item) => total + item.quantity, 0);
    };


    useEffect(() => {
        dispatch(fetchCartItems(user?.id))
    }, [dispatch])


    return (
        <header className='sticky top-0 z-40 w-full border-b bg-background'>
            <div className='flex items-center justify-between h-24 px-4 py-2 md:px-10'>
                <Link to='/shop/home' >
                    <img src={assets.logo} alt="" className='w-60' />
                </Link>
                <Sheet >
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="lg:hidden">
                            <Menu size={6} />
                            <span className='sr-only'>Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-full max-w-xs">
                        <ShopMenuItems />
                        <div className='flex items-center border-t-2 mt-4 pt-4 gap-4'>
                            <Button variant="outline" size="icon">
                                <ShoppingCart />
                                <span className='sr-only'>User cart</span>
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Avatar className="bg-black">
                                        <AvatarFallback className="bg-black text-white flex items-center font-extralight">
                                            <p>{user?.username[0].toUpperCase()}</p>
                                        </AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side="bottom" className="w-56 mr-8 mt-4">
                                    <DropdownMenuLabel className="text-md">Hello, {user?.username}</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => navigate('/shop/account')}>
                                        <UserCog2 className='mr-2 size-4' />
                                        <p>Profile</p>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleLogout

                                    }>
                                        <LogOut className='mr-2 size-4' />
                                        <p>Logout</p>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </SheetContent>
                </Sheet>
                <div className='hidden lg:block'>
                    <ShopMenuItems />
                </div>


                <div className='hidden lg:block'>
                    <div className='flex flex-col lg:items-center lg:flex-row gap-6 '>
                        <Sheet open={openCart} onOpenChange={() => setOpenCart(false)}>
                            <Button variant="outline" onClick={() => setOpenCart(true)} className="relative size-12">
                                <ShoppingCart size={10} />
                                <span className='sr-only'>User cart</span>
                                {getCartCount() > 0 && (
                                    <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 rounded-full">
                                        {getCartCount()}
                                    </span>
                                )}
                            </Button>
                            <UserCartWrapper
                                cartItems={cartItems && cartItems.items && cartItems.items.length > 0 ? cartItems.items : []}
                                setOpenCart={setOpenCart}
                            />
                        </Sheet>
                        {
                            isAuthenticated ? (<DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Avatar className="bg-black">
                                        <AvatarFallback className="bg-black text-white flex items-center font-extralight">
                                            <p>{user?.username[0].toUpperCase()}</p>
                                        </AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side="bottom" className="w-56 mr-8 mt-4">
                                    <DropdownMenuLabel className="text-md">Hello, {user?.username}</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => navigate('/shop/account')}>
                                        <UserCog2 className='mr-2 size-4' />
                                        <p>Account</p>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <Settings className='mr-2 size-4' />
                                        <p>Settings</p>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleLogout}>
                                        <LogOut className='mr-2 size-4' />
                                        <p>Logout</p>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>) : <User onClick={() => navigate('/auth/login')} />
                        }

                    </div>
                </div>


            </div>
        </header>
    )
}

export default ShoppingHeader
