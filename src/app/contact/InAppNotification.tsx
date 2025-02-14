import {
    NovuProvider,
    PopoverNotificationCenter,
    NotificationBell,
    IMessage,
} from "@novu/notification-center";
import { FC } from 'react';

interface INovuProps {
    subscriberId: string
}

export const InAppNotification: FC<INovuProps> = ({ subscriberId }) => {
    const novuAppId = process.env.NEXT_PUBLIC_NOVU_APP_ID || '';

    return (
        <div className="flex justify-end">
            <NovuProvider
                subscriberId={subscriberId}
                applicationIdentifier={novuAppId}
            >
                <PopoverNotificationCenter colorScheme="dark" position='top-end'>
                    {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
                </PopoverNotificationCenter>
            </NovuProvider>
        </div>
    );
}

export default InAppNotification