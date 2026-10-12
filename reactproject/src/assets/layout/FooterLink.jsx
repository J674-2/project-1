import { Link } from 'react-router';

import { memo } from 'react';

const FooterLink = memo(function FooterLink({to, page}) {
    return (
        <li><Link to={to}>{page}</Link></li>
    )
})

export default FooterLink