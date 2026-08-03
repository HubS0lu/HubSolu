/**
 * Formata um número de telefone para uso na API do WhatsApp (wa.me)
 * @param {string} phone - Número de telefone (pode conter formatação como parênteses e traços)
 * @returns {string} - Número formatado apenas com dígitos e com o código do país (55 para Brasil)
 */
export function formatWhatsAppNumber(phone) {
  if (!phone) return "5511999999999"; // Fallback seguro
  
  // Remove todos os caracteres que não sejam dígitos
  let digits = phone.replace(/\D/g, '');
  
  // Se estiver vazio após limpeza, retorna o fallback
  if (!digits) return "5511999999999";

  // Se tiver 10 ou 11 dígitos, provavelmente é um número brasileiro sem DDI
  // Ex: 11987654321
  if (digits.length === 10 || digits.length === 11) {
    return '55' + digits;
  }
  
  // Se tiver 12 ou 13 dígitos e começar com 55, já está correto
  // Ex: 5511987654321
  if ((digits.length === 12 || digits.length === 13) && digits.startsWith('55')) {
    return digits;
  }
  
  // Caso contrário, retorna os dígitos limpos (pode ser internacional)
  return digits;
}
