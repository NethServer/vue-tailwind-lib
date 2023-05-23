// Copyright (C) 2023 Nethesis S.r.l.
// SPDX-License-Identifier: AGPL-3.0-or-later

export const setStringItem = (name: string, value: string) => {
  localStorage.setItem(name, value)
}

export const getStringItem = (name: string) => {
  return localStorage.getItem(name)
}
