// Sidebar imports
import {
    UilEstate,
    UilClipboardAlt,
    UilUsersAlt,
    // UilPackage,
    UilChart,
    // UilSignOutAlt,
} from '@iconscout/react-unicons';

import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import TwoWheelerOutlinedIcon from '@mui/icons-material/TwoWheelerOutlined';
import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined';

// Analytics Cards imports
import { UilUsdSquare, UilMoneyWithdrawal } from '@iconscout/react-unicons';
// import { keyboard } from '@testing-library/user-event/dist/keyboard';


// Sidebar Data
export const SidebarData = [
    {
        icon: UilEstate,
        heading: 'Dashboard',
        path: '/',
    },
    {
        icon: UilUsersAlt,
        heading: 'Khách hàng',
        path: '/customers',
    },
    {
        icon: CategoryOutlinedIcon,
        heading: 'Danh mục',
        path: '/category',
    },
    {
        icon: TwoWheelerOutlinedIcon,
        heading: 'Xe máy',
        path: '/motors',
    },
    {
        icon: HandymanOutlinedIcon,
        heading: 'Phụ tùng',
        path: '/accessories',
    },
    {
        icon: UilClipboardAlt,
        heading: 'Hoá đơn',
        path: '/order',
    },
    {
        icon: UilChart,
        heading: 'Phân tích',
        path: '/analytics',
    },
];

// Analytics Cards Data
export const cardsData = [
    {
        title: 'Sales',
        color: {
            backGround: 'linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)',
            boxShadow: '0px 10px 20px 0px #e0c6f5',
        },
        barValue: 70,
        value: '25,970',
        png: UilUsdSquare,
        series: [
            {
                name: 'Sales',
                data: [31, 40, 28, 51, 42, 109, 100],
            },
        ],
    },
    {
        title: 'Revenue',
        color: {
            backGround: 'linear-gradient(180deg, #FF919D 0%, #FC929D 100%)',
            boxShadow: '0px 10px 20px 0px #FDC0C7',
        },
        barValue: 80,
        value: '14,270',
        png: UilMoneyWithdrawal,
        series: [
            {
                name: 'Revenue',
                data: [10, 100, 50, 70, 80, 30, 40],
            },
        ],
    },
    {
        title: 'Expenses',
        color: {
            backGround:
                'linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)',
            boxShadow: '0px 10px 20px 0px #F9D59B',
        },
        barValue: 60,
        value: '4,270',
        png: UilClipboardAlt,
        series: [
            {
                name: 'Expenses',
                data: [10, 25, 15, 30, 12, 15, 20],
            },
        ],
    },
];

// Recent Update Card Data
export const UpdatesData = [
    {
        img: 'https://scontent.xx.fbcdn.net/v/t1.15752-9/452569870_477015625050633_2520174119165289625_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeEMRU7actovNMnnnuoP04H_LiBCa2pCdDguIEJrakJ0OGr1XI6doNaFRbrlZ8HfNt2pTViBRPmf7Ew3mIyv756T&_nc_ohc=suzbpKuhrlgQ7kNvgFghWJu&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_Q7cD1QHN3IEz_9YUrlb-aS0UGc0Q9BJXk8eiQ-aI0JHWvXH03A&oe=66DE4C90',
        name: 'Elon Dao',
        noti: 'đã đặt hàng M 1000 RR.',
        time: '25 giây',
    },
    {
        img: 'https://scontent.fsgn8-3.fna.fbcdn.net/v/t1.6435-1/168120358_243280274167565_3614056355110904990_n.jpg?stp=dst-jpg_p200x200&_nc_cat=109&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeFq704cUcb__M3K199aDSNOJEGvbJWe4DIkQa9slZ7gMpZmxxWLZEc45wGx1dJXvW07hmHcrAWcdjkT7dSJfV6x&_nc_ohc=kyRy7uoOl8UQ7kNvgGZjtHm&_nc_ht=scontent.fsgn8-3.fna&oh=00_AYD4BUGVpMlWjJgQHvyEiHt1nWSyBDDgKntk466bkZfLBg&oe=66C6DCA5',
        name: 'Kingu Le',
        noti: 'đã nhận S 1000 RR.',
        time: '30 phút',
    },
    {
        img: 'https://scontent.fsgn5-9.fna.fbcdn.net/v/t1.6435-9/147266328_737225440250954_804762162063576119_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeFe1L4WHq_u25cGiVU3fAFWGT1zidYvq84ZPXOJ1i-rzosq61aKVcR9ObHJ_m3_ys9N-pF41dWRhcaVtU7B1X6u&_nc_ohc=Kh7NAvox6uMQ7kNvgEOL7Y0&_nc_ht=scontent.fsgn5-9.fna&oh=00_AYDj7rvLFynj-p_BC5bBEOUTzAjBZuy_RJEIwK3eIHA53w&oe=66DE603B',
        name: 'Wolf Tran',
        noti: 'đã đặt hàng GS 1250 AT',
        time: '2 tiếng',
    },
];
