/**
 * Показывает сообщение перед обновлением или уходом со страницы.
 *
 * @param {BeforeUnloadEvent} event     Событие удаления данных страницы
 * @returns                             Сообщение которое будет показано
 */
export default function beforeUnload(event) {
  const message = 'Are you shure you want to leave this page?'
  event.returnValue = message
  return message
}
