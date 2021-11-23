#include <bits/stdc++.h>
#define maxn 1003
#define maxc 1000000003

using namespace std;

int n, a[maxn];

int main()
{
    freopen("inp.txt", "r", stdin);
    freopen("out.txt", "w", stdout);
    cin >> n;
    for(int i=1; i<=n; i++)
        cin >> a[i];
    int ans = -maxc;
    for(int i=1; i<=n; i++)
        if(a[i] % 2 == 0)
            ans = max(ans, a[i]);
    if(ans == -maxc)    cout << -1;
    else    cout << ans;
}
