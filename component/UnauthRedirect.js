import Link from 'next/link';
import React from 'react';

function UnauthRedirect() {
  return (
        <div>
          <h2>You are not authorised to this </h2>
          <p>To see this </p>
          <Link href="/api/phone-auth">Login</Link>
        </div>
  )
}

export default UnauthRedirect;