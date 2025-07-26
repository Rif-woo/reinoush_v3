import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { client, items, subtotal, discount, totalPrice, appliedPromo, currency, location, orderDate } = await request.json();
    
    // Formatage de l'email
    const emailContent = {
      from: 'Reinoush <onboarding@resend.dev>', // Utilisez votre domaine vérifié
      to: [process.env.MANAGER_EMAIL || 'cissreinejosephine@gmail.com'],
      subject: 'Nouvelle commande reçue - Reinoush',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #000; padding-bottom: 10px;">Nouvelle commande reçue</h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; margin: 20px 0; border-radius: 5px;">
            <h3 style="color: #333; margin-top: 0;">Informations client</h3>
            <p><strong>Nom:</strong> ${client.nom} ${client.prenom}</p>
            <p><strong>Téléphone:</strong> ${client.telephone}</p>
            <p><strong>Adresse:</strong> ${client.adresse || 'Non spécifiée'}</p>
            ${location ? `<p><strong>Position GPS:</strong> Latitude: ${location.latitude.toFixed(6)}, Longitude: ${location.longitude.toFixed(6)}</p>` : '<p><strong>Position GPS:</strong> Non capturée</p>'}
            ${location ? `<p><a href="https://www.google.com/maps?q=${location.latitude},${location.longitude}" target="_blank" style="color: #007bff;">Voir sur Google Maps</a></p>` : ''}
          </div>
          
          <div style="background-color: #fff; padding: 20px; margin: 20px 0; border: 1px solid #ddd; border-radius: 5px;">
            <h3 style="color: #333; margin-top: 0;">Articles commandés</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background-color: #f8f9fa;">
                  <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">Article</th>
                  <th style="padding: 10px; text-align: center; border-bottom: 1px solid #ddd;">Quantité</th>
                  <th style="padding: 10px; text-align: right; border-bottom: 1px solid #ddd;">Prix</th>
                </tr>
              </thead>
              <tbody>
                ${items.map(item => {
                  // Utiliser le prix unitaire depuis le contexte de pricing
                  const unitPrice = item.unitPrice || 0;
                  const itemSubtotal = unitPrice * item.quantity;
                  return `
                    <tr>
                      <td style="padding: 10px; border-bottom: 1px solid #eee;">
                        <strong>${item.name}</strong><br>
                        <small style="color: #666;">${item.type} • ${item.volume}</small>
                      </td>
                      <td style="padding: 10px; text-align: center; border-bottom: 1px solid #eee;">${item.quantity}</td>
                      <td style="padding: 10px; text-align: right; border-bottom: 1px solid #eee;">${itemSubtotal.toLocaleString()} ${currency === 'EUR' ? '€' : 'Fcfa'}</td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="2" style="padding: 10px; text-align: right; border-top: 1px solid #ddd;">Sous-total:</td>
                  <td style="padding: 10px; text-align: right; border-top: 1px solid #ddd;">${subtotal.toLocaleString()} ${currency === 'EUR' ? '€' : 'Fcfa'}</td>
                </tr>
                ${appliedPromo ? `
                  <tr style="color: #28a745;">
                    <td colspan="2" style="padding: 10px; text-align: right;">Code promo (${appliedPromo}) - ${Math.round(discount * 100)}%:</td>
                    <td style="padding: 10px; text-align: right;">-${(subtotal * discount).toLocaleString()} ${currency === 'EUR' ? '€' : 'Fcfa'}</td>
                  </tr>
                ` : ''}
                <tr style="background-color: #f8f9fa; font-weight: bold;">
                  <td colspan="2" style="padding: 15px; text-align: right; border-top: 2px solid #333;">Total:</td>
                  <td style="padding: 15px; text-align: right; border-top: 2px solid #333; font-size: 1.2em;">${Math.round(totalPrice).toLocaleString()} ${currency === 'EUR' ? '€' : 'Fcfa'}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          
          ${client.commentaires ? `
            <div style="background-color: #fff3cd; padding: 15px; margin: 20px 0; border: 1px solid #ffeaa7; border-radius: 5px;">
              <h4 style="color: #856404; margin-top: 0;">Commentaires du client:</h4>
              <p style="color: #856404; margin-bottom: 0;">${client.commentaires}</p>
            </div>
          ` : ''}
          
          <div style="background-color: #e9ecef; padding: 15px; margin: 20px 0; border-radius: 5px; text-align: center;">
            <p style="margin: 0; color: #6c757d;">Commande passée le ${new Date(orderDate).toLocaleString('fr-FR')}</p>
          </div>
          
          <p style="color: #666; font-size: 0.9em; text-align: center; margin-top: 30px;">
            Cet email a été généré automatiquement par le système de commande Reinoush.
          </p>
        </div>
      `
    };

    const data = await resend.emails.send(emailContent);

    return Response.json({ message: 'Commande envoyée avec succès.', data }, { status: 200 });
    
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return Response.json(
      { message: 'Erreur lors de l\'envoi de la commande.', error: error.message },
      { status: 500 }
    );
  }
}
