import { Component, inject } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { NgIf } from '@angular/common';
import { ButtonDirective } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';
import { Transaction } from '../../../types/Transaction';
import { UserTransactionsService } from '../../../services/user/user-transactions.service';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';
import { transition } from '@angular/animations';
import { PrimeTemplate } from 'primeng/api';

@Component({
  selector: 'app-user-transaction-display',
  imports: [Dialog, NgIf, ButtonDirective, Tooltip, PrimeTemplate],
  templateUrl: './user-transaction-display.component.html',
})
export class UserTransactionDisplayComponent {
  transactionService = inject(UserTransactionsService);

  protected readonly parseInt = parseInt;
  transactionDetailsVisible: boolean = false;
  selectedTransaction!: Transaction;
  totalTransactions: number = 0;

  /**
   * Calcule le montant HT à partir du montant TTC et du taux de TVA
   */
  calculateHT(amount: string | number, tva: string | number): number {
    const amountNum = typeof amount === 'string' ? parseFloat(amount) : amount;
    const tvaNum = typeof tva === 'string' ? parseFloat(tva) : tva;

    return parseFloat((amountNum / (1 + tvaNum / 100)).toFixed(2));
  }

  /**
   * Calcule le montant de TVA
   */
  calculateTVA(amount: string | number, tva: string | number): number {
    const amountNum = typeof amount === 'string' ? parseFloat(amount) : amount;
    const tvaNum = typeof tva === 'string' ? parseFloat(tva) : tva;

    const ht = this.calculateHT(amountNum, tvaNum);
    return parseFloat((amountNum - ht).toFixed(2));
  }

  /**
   * Affiche les détails d'une transaction
   */
  showTransactionDetails(transaction: Transaction): void {
    this.selectedTransaction = transaction;
    this.transactionDetailsVisible = true;
  }

  calculateDaysSince(dateString: string): string {
    // Extraction des parties de la date au format dd-mm-yyyy
    const parts = dateString.split('-');
    if (parts.length >= 3) {
      const day = parseInt(parts[0]);
      const month = parseInt(parts[1]) - 1; // Les mois commencent à 0 en JavaScript
      const year = parseInt(parts[2].substring(0, 4)); // En cas d'heure attachée

      const transactionDate = new Date(year, month, day);
      const today = new Date();

      // Réinitialiser les heures pour comparer uniquement les dates
      today.setHours(0, 0, 0, 0);
      transactionDate.setHours(0, 0, 0, 0);

      const diffTime = Math.abs(today.getTime() - transactionDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0) {
        return "Aujourd'hui";
      } else if (diffDays === 1) {
        return 'Hier';
      } else {
        return `Il y a ${diffDays} jours`;
      }
    }
    return 'Date inconnue';
  }

  downloadPDF(transaction: Transaction): void {
    const doc = new jsPDF();

    const primaryColor = '#003366';

    // Ajouter un en-tête avec le logo (remplacer par votre logo)
    doc.setFillColor(primaryColor);
    doc.rect(0, 0, 210, 30, 'F');
    doc.setTextColor('#ffffff');
    doc.setFontSize(22);
    doc.text('MyRocket Facture', 105, 20, { align: 'center' });

    // Informations de la facture
    doc.setTextColor('#000000');
    doc.setFontSize(12);

    // Date et numéro de facture
    doc.setFontSize(10);
    doc.text(`Facture N°: ${transaction.uuid.substring(0, 8).toUpperCase()}`, 150, 40);

    // Formatage de la date
    const date = new Date(transaction.createdAt);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const dateFormatted = date.toLocaleDateString('fr-FR', options);
    doc.text(`Date: ${dateFormatted}`, 150, 45);

    // Informations du client et du site web
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('INFORMATIONS CLIENT', 20, 40);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Client: ${transaction.user}`, 20, 45);
    doc.text(`ID Client: ${transaction.userUuid.substring(0, 8).toUpperCase()}`, 20, 50);

    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('INFORMATIONS SITE WEB', 20, 60);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Contrat: ${transaction.websiteContract}`, 20, 65);
    doc.text(`ID Site: ${transaction.websiteUuid.substring(0, 8).toUpperCase()}`, 20, 70);

    // Ligne séparatrice
    doc.setDrawColor(primaryColor);
    doc.setLineWidth(0.5);
    doc.line(20, 80, 190, 80);

    // Tableau de détails de la transaction
    autoTable(doc, {
      startY: 90,
      head: [['Description', 'Montant HT', 'TVA', 'Montant TTC']],
      body: [
        [
          'Services Web',
          `${parseFloat(transaction.amount).toFixed(2)} €`,
          typeof transaction.tva === 'string'
            ? `${parseFloat(transaction.tva).toFixed(2)} %`
            : `${transaction.tva.toFixed(2)} %`,
          `${(
            parseFloat(transaction.amount) *
            (1 +
              (typeof transaction.tva === 'string'
                ? parseFloat(transaction.tva)
                : transaction.tva) /
                100)
          ).toFixed(2)} €`,
        ],
      ],
      theme: 'grid',
      headStyles: {
        fillColor: primaryColor,
        textColor: '#ffffff',
        fontStyle: 'bold',
      },
      styles: {
        halign: 'center',
      },
      columnStyles: {
        0: { halign: 'left' },
      },
    });

    // Calcul du montant total
    const montantHT = parseFloat(transaction.amount);
    const tauxTVA =
      typeof transaction.tva === 'string' ? parseFloat(transaction.tva) : transaction.tva;
    const montantTVA = montantHT * (tauxTVA / 100);
    const montantTTC = montantHT + montantTVA;

    // Tableau récapitulatif
    const finalY = (doc as any).lastAutoTable.finalY + 10;

    autoTable(doc, {
      startY: finalY,
      body: [
        ['', 'Montant HT', `${montantHT.toFixed(2)} €`],
        ['', `TVA (${tauxTVA.toFixed(2)} %)`, `${montantTVA.toFixed(2)} €`],
        ['', 'Montant TTC', `${montantTTC.toFixed(2)} €`],
      ],
      theme: 'plain',
      styles: {
        cellPadding: 2,
      },
      columnStyles: {
        0: { cellWidth: 100 },
        1: { fontStyle: 'bold', halign: 'right' },
        2: { fontStyle: 'bold', halign: 'right' },
      },
    });

    // Pied de page
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);

      // Ajouter les informations légales
      doc.setFontSize(7);
      doc.setTextColor(100, 100, 100);
      doc.text(
        'SARL EXEMPLE - Capital social : 10 000€ - SIRET : 123 456 789 00010 - RCS Paris B 123 456 789',
        105,
        275,
        { align: 'center' }
      );
      doc.text(
        'TVA Intracommunautaire : FR 12 123456789 - APE : 6201Z - Développement informatique',
        105,
        280,
        { align: 'center' }
      );
      doc.text('Siège social : 123 Avenue des Champs-Élysées, 75008 Paris, France', 105, 285, {
        align: 'center',
      });

      // Numérotation des pages
      doc.setFontSize(8);
      doc.text(`Page ${i} sur ${pageCount}`, 105, 292, { align: 'center' });
    }

    // Télécharger le PDF
    doc.save(`MyRocketFacture_${transaction.uuid.substring(0, 8)}.pdf`);
  }

  protected readonly transition = transition;
}
