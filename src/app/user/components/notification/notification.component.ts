import { Component, inject, OnInit } from '@angular/core';
import { UserNotificationsService } from '../../../services/user/user-notifications.service';
import { Sidebar } from 'primeng/sidebar';
import { Button, ButtonDirective, ButtonIcon } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Ripple } from 'primeng/ripple';
import { MessageService, PrimeTemplate } from 'primeng/api';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Drawer } from 'primeng/drawer';
import { Tooltip } from 'primeng/tooltip';

@Component({
  selector: 'app-notification',
  imports: [
    ButtonDirective,
    CommonModule,
    Ripple,
    PrimeTemplate,
    Button,
    Drawer,
    Tooltip,
  ],
  templateUrl: './notification.component.html',
})
export class NotificationComponent implements OnInit {
  notificationService = inject(UserNotificationsService);
  messagerieService = inject(MessageService);
  visible: boolean = false;

  ngOnInit() {
    this.notificationService.refreshNotifications().subscribe();
  }

  getUnreadCount(): number {
    return this.notificationService.notifications().filter(notification => !notification.readingAt)
      .length;
  }

  markAsRead(notification: any) {
    this.notificationService.deleteOneNotification(notification.uuid).subscribe({
      next: () => {
        this.messagerieService.add({
          severity: 'success',
          summary: 'Notification validée',
        });
      },
      error: () => {
        this.messagerieService.add({
          severity: 'error',
          summary: 'Notification non validée',
        });
      },
    });

    const updatedNotifications = this.notificationService.notifications().map(n => {
      if (n.uuid === notification.uuid) {
        return { ...n, readingAt: new Date().toISOString() };
      }
      return n;
    });

    this.notificationService.notifications.set(updatedNotifications);
  }

  markAllAsRead() {
    this.notificationService.deleteAllNotification().subscribe({
      next: () => {
        this.messagerieService.add({
          severity: 'success',
          summary: 'Notification validée',
        });
      },
      error: () => {
        this.messagerieService.add({
          severity: 'error',
          summary: 'Notification non validée',
        });
      },
    });

    const updatedNotifications = this.notificationService.notifications().map(n => {
      if (!n.readingAt) {
        return { ...n, readingAt: new Date().toISOString() };
      }
      return n;
    });

    this.notificationService.notifications.set(updatedNotifications);
  }

  formatDate(dateString: string): string {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true, locale: fr });
    } catch (e) {
      return dateString;
    }
  }

  getNotificationIcon(notification: any): string {
    if (notification.isPriority) {
      return 'pi-exclamation-circle';
    }

    const title = notification.title.toLowerCase();

    if (title.includes('contrat')) {
      return 'pi-file-edit';
    } else if (title.includes('facture')) {
      return 'pi-wallet';
    } else if (title.includes('site web')) {
      return 'pi-globe';
    } else if (title.includes('accès')) {
      return 'pi-key';
    } else {
      return 'pi-info-circle';
    }
  }
}
